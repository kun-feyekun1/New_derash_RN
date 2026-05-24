type LogMeta = Record<string, unknown>;

export const logger = {
  info(message: string, meta?: LogMeta) {
    if (__DEV__) {
      console.info(`[Derash] ${message}`, meta ?? '');
    }
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(`[Derash] ${message}`, meta ?? '');
  },
  error(message: string, meta?: LogMeta) {
    console.error(`[Derash] ${message}`, meta ?? '');
  }
};
