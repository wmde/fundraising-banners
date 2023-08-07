import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';

const expectShowsCreditCardLogos = ( wrapper: VueWrapper<any> ): void => {
	expect( wrapper.find( '.visa-logo' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.mastercard-logo' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.amex-logo' ).exists() ).toBeTruthy();
};

const expectShowsPayPalLogo = ( wrapper: VueWrapper<any> ): void => {
	expect( wrapper.find( '.paypal-logo' ).exists() ).toBeTruthy();
};

const expectShowsSepaLogo = ( wrapper: VueWrapper<any> ): void => {
	expect( wrapper.find( '.sepa-logo' ).exists() ).toBeTruthy();
};

export const paymentIconFeatures: Record<string, ( wrapper: VueWrapper<any> ) => void> = {
	expectShowsCreditCardLogos,
	expectShowsPayPalLogo,
	expectShowsSepaLogo
};
