import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DonorHeart from '@src/components/DonorHeart/DonorHeart.vue';

const donorStats = { currentDailyPercentage: 0.75, currentDonorsNeeded: '4,200' };

describe( 'DonorHeart.vue', () => {
	it( 'renders the correct donor average values', () => {
		const wrapper = shallowMount( DonorHeart, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					dailyDonorAverage: donorStats
				}
			}
		} );

		expect( wrapper.find( '.wmde-banner-donor-heart' ).attributes( 'style' ) ).toStrictEqual( '--current-donation-fill: -33px;' );
		expect( wrapper.find( '.wmde-banner-donor-heart-text-total' ).text() ).toStrictEqual( '4,200' );
	} );
} );
