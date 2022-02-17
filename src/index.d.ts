declare module 'react-native-stripe-api' {
  export type CreateTokenType = {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
  };

  export type CreateTokenResponse = {
    id: string;
    object: string;
    card: Card;
    client_ip: string;
    created: number;
    livemode: boolean;
    type: string;
    used: boolean;
  };

  export type Card = {
    id: string;
    object: string;
    address_city: null;
    address_country: null;
    address_line1: null;
    address_line1_check: null;
    address_line2: null;
    address_state: null;
    address_zip: null;
    address_zip_check: null;
    brand: string;
    country: string;
    cvc_check: string;
    dynamic_last4: null;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
    name: null;
    tokenization_method: null;
  };

  // type StripeApiType = {
  //   createToken: (info: CreateTokenType) => Promise<CreateTokenResponse>;
  // };

  // const StripeApi: StripeApiType;

  class StripeApi {
    createToken: (info: CreateTokenType) => Promise<CreateTokenResponse>;
    constructor(token: string);
  }

  export default StripeApi;
}
