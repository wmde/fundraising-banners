import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { DailyDonorStatsValues } from '@src/utils/DynamicContent/DailyDonorAverage';

export const testDonorHeartValues: DailyDonorStatsValues = {
	currentDailyPercentage: 0.4875,
	averageDailyDonors: '4,760',
	currentDonorsSoFar: '2,321',
	currentDonorsNeeded: '2,440'
};

const expectShowsDonorHeart = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	expect( wrapper.find( '.wmde-banner-donor-heart' ).exists() ).toBeTruthy();
	expect( wrapper.find( '.wmde-banner-donor-heart-text-total' ).text() ).toStrictEqual( '2,440' );
	expect( wrapper.find( '.wmde-banner-donor-heart' ).attributes( 'style' ) ).toStrictEqual( '--current-donation-fill: -21px;' );
};

export const donorHeartFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectShowsDonorHeart
};
