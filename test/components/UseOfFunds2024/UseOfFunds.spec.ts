import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UseOfFunds from '@src/components/UseOfFunds2024/UseOfFunds.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';

const content: UseOfFundsContent = {
	accordion: { items: [], summary: '' },
	benefits: { items: [], title: '' },
	callToAction: '',
	closingParagraph: '',
	revenueComparison: { companies: { items: [], title: '' }, content: [], title: '' },
	summary: '',
	title: ''
};

describe( 'UseOfFunds.vue', () => {
	it( 'emits event when call to action is clicked', async () => {
		const wrapper = mount( UseOfFunds, {
			props: {
				content
			}
		} );

		await wrapper.find( '.call-to-action button' ).trigger( 'click' );

		expect( wrapper.emitted( 'callToAction' ).length ).toBe( 1 );
	} );
} );
