import { appConfig } from '@/config/environment';
import { logger } from '@/services/logging/logger';

type Listener<T> = (payload: T) => void;

export class RealtimeClient {
  private socket: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  connect(token: string) {
    if (!appConfig.featureFlags.enableRealtimeTracking || this.socket) {
      return;
    }

    this.socket = new WebSocket(`${appConfig.realtimeUrl}?token=${encodeURIComponent(token)}`);
    this.socket.onerror = () => logger.warn('Realtime tracking socket error');
    this.socket.onclose = () => {
      this.socket = null;
      this.reconnectTimer = setTimeout(() => this.connect(token), 5000);
    };
  }

  subscribe<T>(event: string, listener: Listener<T>) {
    if (!this.socket) {
      return () => undefined;
    }

    const handler = (message: MessageEvent) => {
      const parsed = JSON.parse(String(message.data)) as { event: string; payload: T };
      if (parsed.event === event) {
        listener(parsed.payload);
      }
    };

    this.socket.addEventListener('message', handler);
    return () => this.socket?.removeEventListener('message', handler);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.socket?.close();
    this.socket = null;
  }
}

export const realtimeClient = new RealtimeClient();
