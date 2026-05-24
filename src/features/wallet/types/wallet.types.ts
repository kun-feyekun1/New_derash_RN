export type WalletSummary = {
  balance: number;
  currency: 'ETB';
  paymentMethods: Array<{
    id: string;
    label: string;
    provider: 'telebirr' | 'cbe' | 'card' | 'cash';
    enabled: boolean;
  }>;
};
