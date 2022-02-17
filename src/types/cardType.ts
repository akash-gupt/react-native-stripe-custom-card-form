
export type CardFormBody = {
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  number: string;
  name: string;
  expiry: string;
  type: string;
};

export type GetStripeTokenResponse = {
  token: string;
};

export type CreateCardTokenBody = {
  cvc: string;
  expMonth: number;
  expYear: number;
  number: string;
};

export type CreateCardTokenResponse = {
  created: string;
  id: string;
  object: string;
  used: boolean;
};

export type GetStripeCardResponse = {
  cards: StripeCardType[];
};

export type StripeCardType = {
  brand: string;
  id: string;
  last4: string;
  name: string;
  exp_month: string;
  exp_year: string;
};

export type CreatePaymentIntentResponse = {
  clientSecret: string;
};

export type CurrencyType = 'Dollar';

export type CreatePaymentIntentBody = {
  amount: number;
  currency: CurrencyType;
  orderNo: string;
  paymentMethodType: string;
  paymentMethodId?: string;
};
