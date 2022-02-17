import { CreateCardTokenBody, CreatePaymentIntentBody } from '../types';

const getPublishableKey = async () => {
  return { pubKey: '' }
};

const saveCardWithToken = async (cardToken: string) => {
       // call backend api to save card with token
};

const getExistingCards = async () => {
};

const createPaymentIntent = async (body: CreatePaymentIntentBody) => {
  return { clientSecret: '' }
};

export default {
  getPublishableKey,
  getExistingCards,
  createPaymentIntent,
  saveCardWithToken,
};
