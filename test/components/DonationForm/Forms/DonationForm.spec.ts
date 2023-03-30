import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DonationForm from '@src/components/DonationForm/Forms/DonationForm.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';

const formItems: DonationFormItems = {
	addressType: [ AddressTypes.NO, AddressTypes.EMAIL ],
	amounts: [
		{ value: '1', label: '€1', className: 'amount-1' },
		{ value: '5', label: '€5', className: 'amount-5' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD ]
};

describe( 'DonationForm.vue', () => {
	let wrapper: VueWrapper<any>;

	beforeEach( () => {
		wrapper = mount( DonationForm, {
			props: {
				formUrl: 'https://example.com',
				formItems: formItems
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
	} );

	it.todo( 'shows invalid fields on submit when fields are invalid' );

	it.todo( 'emits and event on submit when fields are valid' );
} );
