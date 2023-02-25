export interface PurchaseInit {
  id: string;
  projectId: string;
  amount: string;
  currency: string;
  recipient: string;
  quote: PurchaseInitQuote;
  status: string;
}

export interface PurchaseInitQuote {
  details: PurchaseInitQuoteDetails[];
  total: PurchaseInitQuoteDetails;
  created: Date;
  expires: Date;
}

export interface PurchaseInitQuoteDetails {
  description: string;
  amount: string;
  currency: string;
}
