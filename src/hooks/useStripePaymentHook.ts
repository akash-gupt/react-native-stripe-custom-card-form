import {
  initStripe,
} from '@stripe/stripe-react-native';
import { useEffect, useMemo, useState } from 'react';

import StripeToken, { CreateTokenType } from 'react-native-stripe-api';
import StripeService from '../data/StripeService';
import { CardFormBody, CurrencyType } from '../types';

export const useStripePaymentHook = () => {
  const [pubKey, setPubKey] = useState<string>();
  const [currency, setCurrency] = useState<CurrencyType>('Dollar');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { pubKey } = await StripeService.getPublishableKey();
    setPubKey(pubKey)

    await initStripe({
      publishableKey: pubKey,
      merchantIdentifier: 'merchant.com.pocketle',
    });
  };


  const createCardToken = async (cardInfo: CreateTokenType) => {
    if (!pubKey) {
      throw new Error('publish key not available');
    }

    const client = new StripeToken(pubKey);
    const response = await client.createToken(cardInfo);
    console.log('Token created', response);

    const cardToken = response.id;
    const cardId = response.card.id;

    return { cardToken, cardId };
  };

  const addCardToCustomer = async (card: CardFormBody) => {
    const { cvv, expiryMonth, number } = card;
    const year = card.expiryYear.length == 4
      ? card.expiryYear.slice(2, card.expiryYear.length)
      : card.expiryYear;

    const { cardId, cardToken } = await createCardToken({
      cvc: cvv,
      exp_month: expiryMonth,
      exp_year: year,
      number: number,
    });

    await StripeService.saveCardWithToken(cardToken);
    return cardId;
  };

  const payWithCard = async (
    referenceNumber: string,
    amount: number,
    card: CardFormBody,
  ) => {
    try {
      const cardToken = await addCardToCustomer(card);

      if (!cardToken) {
        console.log('no card token found');
        return false;
      }

      await payWithExistingCard(referenceNumber, amount, cardToken);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const payWithExistingCard = async (
    referenceNumber: string,
    amount: number,
    cardId: string,
  ) => {
    let success = false;

    try {
      // charge card off session https://github.com/stripe/stripe-react-native/blob/master/example/src/screens/SetupFuturePaymentScreen.tsx
      const { clientSecret } = await StripeService.createPaymentIntent({
        amount,
        currency,
        orderNo: referenceNumber,
        paymentMethodType: 'CREDIT_CARD',
        paymentMethodId: cardId,
      });

      if (clientSecret) {
        success = true;
      } else {
        success = false;
      }
    } catch (error: any) {
      success = false
    }

    return { success }
  };

  return {
    createCardToken,
    payWithCard,
    payWithExistingCard,
    addCardToCustomer,
  };
};
