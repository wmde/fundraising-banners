import { describe, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FallbackBanner from '@banners/desktop/C25_WMDE_Desktop_DE_00/components/FallbackBanner.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { useOfFundsContent } from '@test/banners/useOfFundsContent2024';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { Tracker } from '@src/tracking/Tracker';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { fallbackBannerFeatures, submitFeatures } from '@test/features/FallbackBanner';
import { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';

const translator = ( key: string ): string => key;

describe( 'FallbackBanner.vue', () => {
	const getWrapperAtWidth = ( width: number, dynamicContent: DynamicContent = null, tracker: Tracker = null, timer: Timer = null ): VueWrapper<any> => {
		Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: width } );
		return mount( FallbackBanner, {
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				donationLink: 'https://spenden.wikimedia.de'
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					currentCampaignTimePercentage: 42,
					tracker: tracker ?? new TrackerStub(),
					timer: timer ?? new TimerStub()
				}
			}
		} );
	};

	test.each( [
		[ 'showsTheSmallBanner' ],
		[ 'showsTheLargeBanner' ],
		[ 'emitsTheBannerCloseEvent' ],
		[ 'playsTheSlideshowWhenBecomesVisible' ],
		[ 'showsUseOfFundsFromSmallBanner' ],
		[ 'hidesUseOfFundsFromSmallBanner' ],
		[ 'showsUseOfFundsFromLargeBanner' ],
		[ 'hidesUseOfFundsFromLargeBanner' ]
	] )( '%s', async ( testName: string ) => {
		await fallbackBannerFeatures[ testName ]( getWrapperAtWidth );
	} );

	test.each( [
		[ 'submitsFromLargeBanner' ],
		[ 'submitsFromSmallBanner' ]
	] )( '%s', async ( testName: string ) => {
		await submitFeatures[ testName ]( getWrapperAtWidth );
	} );
} );
