import { describe, expect, it } from 'vitest';
import FundsDistributionAccordion from '@src/components/UseOfFunds/FundsDistributionAccordion.vue';
import { shallowMount } from '@vue/test-utils';
import { ApplicationOfFundsItem } from '@src/domain/UseOfFunds/ApplicationOfFundsItem';

const applicationOfFundsData: ApplicationOfFundsItem[] = [
	{ id: 'one', percentage: 10, text: 'text 01', title: 'title 01' },
	{ id: 'two', percentage: 98, text: 'text 02', title: 'title 02' },
	{ id: 'three', percentage: 43, text: 'text 03', title: 'title 03' },
	{ id: 'four', percentage: 12, text: 'text 04', title: 'title 04' }
];

describe( 'FundsDistributionAccordion.vue', () => {
	it( 'toggles the accordion items when the titles are clicked', async () => {
		const wrapper = shallowMount( FundsDistributionAccordion, {
			props: {
				applicationOfFundsData
			}
		} );

		const item01 = wrapper.find( '.funds-distribution-accordion-item-one' );
		const item02 = wrapper.find( '.funds-distribution-accordion-item-two' );
		const item03 = wrapper.find( '.funds-distribution-accordion-item-three' );
		const item04 = wrapper.find( '.funds-distribution-accordion-item-four' );

		await item01.find( 'button' ).trigger( 'click' );
		await item01.find( 'button' ).trigger( 'click' );
		await item02.find( 'button' ).trigger( 'click' );
		await item04.find( 'button' ).trigger( 'click' );

		expect( item01.classes() ).not.toContain( 'active' );
		expect( item02.classes() ).toContain( 'active' );
		expect( item03.classes() ).not.toContain( 'active' );
		expect( item04.classes() ).toContain( 'active' );
	} );
} );
