import { beforeEach, describe, vi, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '../../../../banners/mobile/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { dynamicCampaignContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { formItems } from '@test/banners/formItems';
import { TrackerStub } from '@test/fixtures/TrackerStub';
import { softCloseFeatures } from '@test/features/SoftCloseMobile';
import { useOfFundsFeatures, useOfFundsScrollFeatures } from '@test/features/UseOfFunds';
import { miniBannerFeatures } from '@test/features/MiniBanner';

let pageScroller: PageScroller;
const translator = ( key: string ): string => key;

describe( 'BannerCtrl.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		wrapper = mount( Banner, {
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
				forms: [],
				useOfFundsContent,
				pageScroller
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
					formItems,
					tracker: new TrackerStub()
				}
			}
		} );
	} );

	describe( 'Soft Close', () => {
		test.each( [
			[ 'expectShowsSoftCloseOnMiniBannerClose' ],
			[ 'expectDoesNotShowSoftCloseOnFullBannerClose' ],
			[ 'expectEmitsSoftCloseCloseEvent' ],
			[ 'expectEmitsSoftCloseMaybeLaterEvent' ],
			[ 'expectEmitsSoftCloseTimeOutEvent' ],
			[ 'expectEmitsBannerContentChangedOnSoftClose' ]
		] )( '%s', async ( testName: string ) => {
			await softCloseFeatures[ testName ]( wrapper );
		} );
	} );

	describe( 'Use of Funds', () => {
		test.each( [
			[ 'expectShowsUseOfFunds' ],
			[ 'expectHidesUseOfFunds' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsFeatures[ testName ]( wrapper );
		} );

		test.each( [
			[ 'expectScrollsToFormWhenCallToActionIsClicked' ],
			[ 'expectScrollsToLinkWhenCloseIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await useOfFundsScrollFeatures[ testName ]( wrapper, pageScroller );
		} );
	} );

	describe( 'Mini Banner', () => {
		test.each( [
			[ 'expectSlideShowPlaysWhenMiniBannerBecomesVisible' ],
			[ 'expectSlideShowStopsWhenFullBannerBecomesVisible' ],
			[ 'expectShowsFullPageWhenCallToActionIsClicked' ],
			[ 'expectEmitsBannerContentCHangedEventWhenCallToActionIsClicked' ]
		] )( '%s', async ( testName: string ) => {
			await miniBannerFeatures[ testName ]( wrapper );
		} );
	} );

} );
