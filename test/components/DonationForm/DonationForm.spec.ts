import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import DonationForm from '@src/components/DonationForm/DonationForm.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';

const formItems: DonationFormItems = {
	addressType: [],
	amounts: [ { value: '0', label: '€0', className: '' } ],
	intervals: [],
	paymentMethods: []
};

describe( 'DonationForm.vue', () => {
	it.todo( 'updates the interval when one is selected', () => {
		const wrapper = mount( DonationForm, {
			props: {
				formUrl: 'https://example.com',
				customAmountPlaceholder: 'custom-amount-placeholder'
			},
			global: {
				provide: { formItems: formItems }
			}
		} );

		// TODO: find input element in first interval and trigger its select event

		// TODO: Check if SubmitValues component (to be done) has the right interval
	} );
} );
