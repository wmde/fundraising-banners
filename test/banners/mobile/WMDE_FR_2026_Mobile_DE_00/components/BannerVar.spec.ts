import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/mobile/WMDE_FR_2026_Mobile_DE_00/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { formItems } from '@test/banners/formItems';
import { TimerStub } from '@test/fixtures/TimerStub';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { Tracker } from '@src/tracking/Tracker';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { nextTick } from 'vue';
import UseOfFundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';

let pageScroller: PageScroller;
let tracker: Tracker;
const formModel = useFormModel();
const translator = ( key: string ): string => key;
describe( 'BannerVar.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	let cachedWrapper: VueWrapper<any>;

	beforeEach( () => {
		resetFormModel( formModel );

		pageScroller = {
			scrollIntoView: vi.fn(),
			scrollToTop: vi.fn()
		};

		tracker = {
			trackEvent: vi.fn()
		};

		// for use of funds dialogue
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	afterEach( () => {
		cachedWrapper.unmount();
	} );

	const getWrapper = (): VueWrapper<any> => {
		cachedWrapper = mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				pageScroller,
				remainingImpressions: 10,
				localCloseTracker: {
					getItem: () => '',
					setItem: () => {}
				}
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: newDynamicContent(),
					formActions: fakeFormActions,
					currencyFormatter: new CurrencyDe(),
					formItems,
					tracker,
					timer: new TimerStub(),
					currentCampaignTimePercentage: 42
				}
			}
		} );

		return cachedWrapper;
	};

	describe( 'Mini Banner', () => {
		it( 'Plays the slideshow when the banner becomes visible', async () => {
			const wrapper = getWrapper();

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeFalsy();

			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'Stops the slideshow on mouse interaction', async () => {
			const wrapper = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-b-slider' ).trigger( 'mousedown' );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeFalsy();
		} );

		it( 'Stops the slideshow on touch interaction', async () => {
			const wrapper = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-b-slider' ).trigger( 'touchstart' );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeFalsy();
		} );

		it( 'Emits the close event on the main banner', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-b-close' ).trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', 'close' ) );
		} );

		it( 'Tracks an event when "I already Donated" is clicked', async () => {
			const wrapper = getWrapper();

			const iAlreadyDonatedButton = wrapper.find( '.wmde-b-foot .wmde-u-link-button:first-child' );
			await iAlreadyDonatedButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', 'already-donated' ) );
		} );
	} );

	describe( 'Soft Close return test tracking', () => {
		it( 'Tracks the submit on return event', async () => {
			const wrapper = getWrapper();
			const localCloseTracker: LocalCloseTracker = {
				getItem: () => 'I chose not to choose a close choice',
				setItem: vi.fn()
			};
			await wrapper.setProps( { localCloseTracker } );
			const submitForm = wrapper.find<HTMLFormElement>( '.wmde-b-form + form' );
			submitForm.element.submit = vi.fn();

			await wrapper.find( '.wmde-b-field-amount [value="10"]' ).trigger( 'change' );
			await wrapper.find( '.wmde-b-form button' ).trigger( 'click' );

			expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( 'I chose not to choose a close choice' ) );
		} );

		it( 'Does not track the submit on return event if the local storage item is missing', async () => {
			const wrapper = getWrapper();
			const localCloseTracker: LocalCloseTracker = {
				getItem: () => '',
				setItem: vi.fn()
			};
			await wrapper.setProps( { localCloseTracker } );
			const submitForm = wrapper.find<HTMLFormElement>( '.wmde-b-form + form' );
			submitForm.element.submit = vi.fn();

			await wrapper.find( '.wmde-b-field-amount [value="10"]' ).trigger( 'change' );
			await wrapper.find( '.wmde-b-form button' ).trigger( 'click' );

			expect( tracker.trackEvent ).not.toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( '' ) );
		} );
	} );

	describe( 'Donation form', () => {
		it( 'Sets an amount when selected', async () => {
			const wrapper = getWrapper();

			expect( wrapper.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '0' );

			await wrapper.find( '.wmde-b-field-amount [value="10"]' ).trigger( 'change' );

			expect( wrapper.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '1000' );

			await wrapper.find( '.wmde-b-field-amount [value="20"]' ).trigger( 'change' );

			expect( wrapper.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '2000' );
		} );

		it( 'Sets a custom amount when selected', async () => {
			const wrapper = getWrapper();

			expect( wrapper.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '0' );

			await wrapper.find( '.wmde-b-field-amount [type="text"]' ).setValue( '42' );

			expect( wrapper.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '4200' );
		} );

		it( 'Shows the amount error if no amount is selected', async () => {
			const wrapper = getWrapper();

			expect( wrapper.find( '.wmde-b-field-amount__error' ).exists() ).toBeFalsy();

			await wrapper.find( '.wmde-b-form button' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-b-field-amount__error' ).exists() ).toBeTruthy();
		} );

		it( 'Sets one time interval if yearly is not selected', async () => {
			const wrapper = getWrapper();

			await nextTick();

			expect( wrapper.find<HTMLInputElement>( '[name="interval"]' ).element.value ).toStrictEqual( '0' );
		} );

		it( 'Sets yearly interval if selected', async () => {
			const wrapper = getWrapper();

			await wrapper.find( '.wmde-b-checkbox-toggle input' ).setValue( true );

			expect( wrapper.find<HTMLInputElement>( '[name="interval"]' ).element.value ).toStrictEqual( '12' );
		} );
	} );

	describe( 'Use of Funds', () => {
		it( 'Shows the use of funds', async () => {
			const wrapper = getWrapper();

			const useOfFundsButton = wrapper.find( '.wmde-b-foot .wmde-u-link-button:last-child' );
			await useOfFundsButton.trigger( 'click' );

			expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'shown' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
			expect( tracker.trackEvent ).toHaveBeenCalledWith( new UseOfFundsShownEvent( 'MainBanner' ) );
		} );

		it( 'Hides the use of funds', async () => {
			const wrapper = getWrapper();

			const useOfFundsButton = wrapper.find( '.wmde-b-foot .wmde-u-link-button:last-child' );
			await useOfFundsButton.trigger( 'click' );
			await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );

			expect( wrapper.findComponent( UseOfFundsModal ).emitted( 'hide' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
		} );
	} );
} );
