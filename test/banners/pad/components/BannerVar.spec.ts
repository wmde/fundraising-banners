import { describe, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/pad/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { softCloseFeatures } from '@test/features/SoftCloseDesktop';
import { useOfFundsFeatures } from '@test/features/UseOfFunds';
import { desktopContentFeatures } from '@test/features/DesktopContent';
import { alreadyDonatedModalFeatures } from '@test/features/AlreadyDonatedModal';

const translator = ( key: string ): string => key;

describe( 'BannerVar.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( Banner, {
			props: {
				bannerState: BannerStates.Pending,
				formController: {
					submitStep: () => {},
					next: () => {},
					previous: () => {},
					onNext: () => {},
					onPrevious: () => {},
					onGoToStep: () => {},
					onSubmit: () => {}
				},
				useOfFundsContent
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicCampaignContent,
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					currencyFormatter: new CurrencyEn(),
					formItems
				}
			}
		} );
	};

	describe( 'Content', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenBecomesVisible' ],
			[ 'expectSlideShowStopsOnFormInteraction' ]
		] )( '%s', async ( testName: string ) => {
			await desktopContentFeatures[ testName ]( getWrapper );
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( getWrapper() );
		} );
	} );

	describe( 'Already Donated Modal', () => {
		test.each( [
			[ 'expectShowsAlreadyDonatedModal' ],
			[ 'expectHidesAlreadyDonatedModal' ],
			[ 'expectFiresMaybeLaterEvent' ],
			[ 'expectFiresGoAwayEvent' ]
		] )( '%s', async ( testName: string ) => {
			await alreadyDonatedModalFeatures[ testName ]( getWrapper() );
		} );
	} );

} );
