export interface PaymentDetails {
  session: PaymentSession;
  provider: PaymentProvider;
  payable: QuotedTotal;
}

export interface PaymentProvider {
  clientSecret: string;
}

export interface QuotedTotal {
  amount: number;
  currency: string;
}

export interface PaymentSession {
  id: string;
  projectId: string;
  amount: string;
  currency: string;
  recipient: string;
  quote: PaymentQuote;
  status: string;
}

export interface PaymentQuote {
  details: QuoteDetails[];
  total: QuoteDetails;
  created: Date;
  expires: Date;
}

export interface QuoteDetails {
  description: string;
  amount: string;
  currency: string;
}
