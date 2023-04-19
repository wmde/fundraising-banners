import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FundsDistributionInfo from '@src/components/UseOfFunds/FundsDistributionInfo.vue';
import { ApplicationOfFundsItem } from '@src/domain/UseOfFunds/ApplicationOfFundsItem';

const applicationOfFundsData: ApplicationOfFundsItem[] = [
	{ id: 'one', percentage: 10, text: 'text 01', title: 'title 01' },
	{ id: 'two', percentage: 98, text: 'text 02', title: 'title 02' },
	{ id: 'three', percentage: 43, text: 'text 03', title: 'title 03' },
	{ id: 'four', percentage: 12, text: 'text 04', title: 'title 04' }
];

describe( 'FundsDistributionInfo.vue', () => {

	it( 'sets the first item active when mounted', async () => {
		const wrapper = shallowMount( FundsDistributionInfo, {
			props: {
				applicationOfFundsData
			}
		} );

		expect( wrapper.find( '.funds-distribution-info-item-one' ).classes() ).toContain( 'active' );
	} );

	it( 'toggles the items when the labels are hovered or clicked', async () => {
		const wrapper = shallowMount( FundsDistributionInfo, {
			props: {
				applicationOfFundsData
			}
		} );

		const item01 = wrapper.find( '.funds-distribution-info-item-one' );
		const item02 = wrapper.find( '.funds-distribution-info-item-two' );
		const item03 = wrapper.find( '.funds-distribution-info-item-three' );
		const item04 = wrapper.find( '.funds-distribution-info-item-four' );

		await item02.trigger( 'mouseenter' );

		expect( item01.classes() ).not.toContain( 'active' );
		expect( item02.classes() ).toContain( 'active' );
		expect( item03.classes() ).not.toContain( 'active' );
		expect( item04.classes() ).not.toContain( 'active' );

		await item03.trigger( 'click' );

		expect( item01.classes() ).not.toContain( 'active' );
		expect( item02.classes() ).not.toContain( 'active' );
		expect( item03.classes() ).toContain( 'active' );
		expect( item04.classes() ).not.toContain( 'active' );
	} );
} );
