import { expect, it, Mock, vitest } from 'vitest';
import { afterEach, beforeEach, describe, vi } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Banner from '@banners/mobile/WMDE_FR_2026_Mobile_DE_04/components/BannerVar.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import type { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { formItems } from '@test/banners/formItems';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import type { Tracker } from '@src/tracking/Tracker';
import type { Timer } from '@src/utils/Timer';
import { TimerStub } from '@test/fixtures/TimerStub';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import UseOfFundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import type { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import MiniDonationForm from '@banners/mobile/WMDE_FR_2026_Mobile_DE_04/components/MiniDonationForm.vue';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';

let pageScroller: PageScroller;
let tracker: Tracker;
const formModel = useFormModel();
const translator = ( key: string ): string => key;
describe( 'BannerVar.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	let wrapper: VueWrapper<any>;
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

	beforeEach( () => {
		vitest.useFakeTimers();
	} );

	afterEach( () => {
		wrapper.unmount();
		vitest.useRealTimers();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): VueWrapper<any> => {
		// attachTo the document body to fix an issue with Vue Test Utils where
		// clicking a submit button in a form does not fire the submit event
		wrapper = mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				pageScroller,
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
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					formActions: fakeFormActions,
					currencyFormatter: new CurrencyDe(),
					formItems,
					tracker,
					timer: timer ?? new TimerStub(),
					currentCampaignTimePercentage: 42
				}
			}
		} );

		return wrapper;
	};

	describe( 'Mini Banner', () => {

		it( 'shows the donation form', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-banner__content--full-page' );
		} );

		it( 'emits a content changed event when the donation form is shown', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await miniButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );

		it( 'emits a close event', async () => {
			getWrapper();

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:last-child button' );
			await closeButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.Close ) );
		} );

		it( 'emits the already donated close event', async () => {
			getWrapper();

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:last-child' );
			await closeButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.AlreadyDonated ) );
		} );

		it( 'plays the slideshow once the banner becomes visible', async () => {
			getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'stops the slideshow once the donation form is shown', async () => {
			getWrapper();

			const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await miniButton.trigger( 'click' );

			expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
		} );
	} );

	describe( 'Donation Form', () => {
		it( 'emits the close event', async () => {
			getWrapper();

			const closeButton = wrapper.find( '.wmde-b-mini-donation-form header > div:last-child button' );
			await closeButton.trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'FullPageBanner', CloseChoices.Hide ) );
		} );

		it( 'Shows and hides the back button', async () => {
			getWrapper();
			const amount15 = wrapper.find( '[name="amount"][value="15"]' );
			const firstForm = wrapper.find( '.wmde-b-donation-form form:nth-child(1)' );
			const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
			const backButtonSelector = '.wmde-b-mini-donation-form header div:first-child button';

			expect( wrapper.find( backButtonSelector ).exists() ).toBeFalsy();

			await amount15.trigger( 'click' );
			await firstForm.trigger( 'submit' );

			expect( wrapper.find( backButtonSelector ).exists() ).toBeTruthy();
			expect( wrapper.find( backButtonSelector ).text() ).toStrictEqual( 'back-button-amount' );

			await yearly.trigger( 'click' );

			expect( wrapper.find( backButtonSelector ).exists() ).toBeTruthy();
			expect( wrapper.find( backButtonSelector ).text() ).toStrictEqual( 'back-button-interval' );

			await wrapper.find( backButtonSelector ).trigger( 'click' );

			expect( wrapper.find( backButtonSelector ).exists() ).toBeTruthy();

			await wrapper.find( backButtonSelector ).trigger( 'click' );

			expect( wrapper.find( backButtonSelector ).exists() ).toBeFalsy();
		} );

		describe( 'Amount Step', () => {
			it( 'sets the amounts in the submit form', async () => {
				getWrapper();
				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const amount50 = wrapper.find( '[name="amount"][value="50"]' );
				const amountCustom = wrapper.find( '[name="custom-amount"]' );
				const submitForm = wrapper.find( '.wmde-b-mini-donation-form > form' );

				await amount15.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '1500' );

				await amount50.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '5000' );

				await amountCustom.setValue( '42.00' );
				expect( submitForm.find<HTMLInputElement>( '[name="amount"]' ).element.value ).toStrictEqual( '4200' );
			} );

			it( 'shows and hides the amount form error', async () => {
				getWrapper();
				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const amountForm = wrapper.find( '.wmde-b-donation-form form:nth-child(1)' );

				expect( wrapper.find( '#wmde-b-amount-error' ).exists() ).toBeFalsy();

				await amountForm.trigger( 'submit' );

				expect( wrapper.find( '#wmde-b-amount-error' ).exists() ).toBeTruthy();
				expect( document.activeElement ).toStrictEqual( wrapper.find( '#wmde-b-amount-error' ).element );

				await amount15.trigger( 'click' );

				expect( wrapper.find( '#wmde-b-amount-error' ).exists() ).toBeFalsy();
			} );
		} );

		describe( 'Interval Step', () => {
			it( 'sets the interval in the submit form', async () => {
				getWrapper();
				const once = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="0"]' );
				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const submitForm = wrapper.find( '.wmde-b-mini-donation-form > form' );

				await once.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="interval"]' ).element.value ).toStrictEqual( '0' );

				await yearly.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="interval"]' ).element.value ).toStrictEqual( '12' );
			} );
		} );

		describe( 'Payment Type Step', () => {
			it( 'sets the payment type in the submit form', async () => {
				getWrapper();

				const paypal = wrapper.find( '[name="payment-method"][value="PPL"]' );
				const directDebit = wrapper.find( '[name="payment-method"][value="BEZ"]' );
				const bankTransfer = wrapper.find( '[name="payment-method"][value="UEB"]' );
				const creditCard = wrapper.find( '[name="payment-method"][value="MCP"]' );
				const submitForm = wrapper.find( '.wmde-b-mini-donation-form > form' );

				await paypal.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="paymentType"]' ).element.value ).toStrictEqual( 'PPL' );

				await directDebit.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="paymentType"]' ).element.value ).toStrictEqual( 'BEZ' );

				await bankTransfer.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="paymentType"]' ).element.value ).toStrictEqual( 'UEB' );

				await creditCard.trigger( 'click' );
				expect( submitForm.find<HTMLInputElement>( '[name="paymentType"]' ).element.value ).toStrictEqual( 'MCP' );
			} );
		} );

		describe( 'Submit', () => {
			it( 'Submits the submit form', async () => {
				getWrapper();

				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const paypal = wrapper.find( '[name="payment-method"][value="PPL"]' );
				const finalForm = wrapper.find( '.wmde-b-donation-form form:nth-child(3)' );
				const submitForm = wrapper.find<HTMLFormElement>( '.wmde-b-mini-donation-form > form' );
				submitForm.element.submit = vi.fn();

				await amount15.trigger( 'click' );
				await yearly.trigger( 'click' );
				await paypal.trigger( 'click' );
				await finalForm.trigger( 'submit' );

				expect( submitForm.element.submit ).toHaveBeenCalled();
			} );

			it( 'submits to a new tab', async () => {
				getWrapper();

				const submitForm = wrapper.find( '.wmde-b-mini-donation-form > form' );
				expect( submitForm.attributes( 'target' ) ).toStrictEqual( '_blank' );
			} );

			it( 'hides the banner on submit', async () => {
				getWrapper();

				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const paypal = wrapper.find( '[name="payment-method"][value="PPL"]' );
				const finalForm = wrapper.find( '.wmde-b-donation-form form:nth-child(3)' );

				// Define a submit on the form so JSDOM doesn't throw errors
				wrapper.find<HTMLFormElement>( '.wmde-b-mini-donation-form > form' ).element.submit = vi.fn();

				await amount15.trigger( 'click' );
				await yearly.trigger( 'click' );
				await paypal.trigger( 'click' );
				await finalForm.trigger( 'submit' );

				expect( wrapper.emitted( 'bannerSubmitted' ).length ).toStrictEqual( 1 );
			} );

			it( 'Submits to the donation form', async () => {
				getWrapper();

				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const paypal = wrapper.find( '[name="payment-method"][value="PPL"]' );
				const submitForm = wrapper.find( '.wmde-b-mini-donation-form > form' );

				await amount15.trigger( 'click' );
				await yearly.trigger( 'click' );
				await paypal.trigger( 'click' );

				expect( submitForm.attributes( 'action' ) ).toContain( 'with-address' );
			} );
		} );

		describe( 'Accessibility', () => {
			it( 'Focuses the first form from the mini banner', async () => {
				getWrapper();
				const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
				const firstForm = wrapper.find( '.wmde-b-donation-form form:nth-child(1)' );

				await miniButton.trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( firstForm.element );
			} );

			it( 'Focuses the second form from the mini banner', async () => {
				getWrapper();
				const miniButtonPreselect = wrapper.find( '.wmde-b-mini-banner footer div:first-child button' );
				const secondForm = wrapper.find( '.wmde-b-donation-form form:nth-child(2)' );

				await miniButtonPreselect.trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( secondForm.element );
			} );

			it( 'Focuses the form pages on step change', async () => {
				getWrapper();
				const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );

				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const firstForm = wrapper.find( '.wmde-b-donation-form form:nth-child(1)' );

				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const secondForm = wrapper.find( '.wmde-b-donation-form form:nth-child(2)' );

				const lastForm = wrapper.find( '.wmde-b-donation-form form:nth-child(3)' );

				await miniButton.trigger( 'click' );
				await vitest.runAllTimersAsync();

				await amount15.trigger( 'click' );
				await firstForm.trigger( 'submit' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( secondForm.element );

				await yearly.trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( lastForm.element );

				const backButton = wrapper.find( '.wmde-b-mini-donation-form header div:first-child button' );

				await backButton.trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( secondForm.element );

				await backButton.trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( firstForm.element );
			} );

			it( 'Handles tabindexes on step change', async () => {
				getWrapper();
				const miniButton = wrapper.find( '.wmde-b-mini-banner footer div:last-child button' );
				const amount15 = wrapper.find( '[name="amount"][value="15"]' );
				const firstForm = wrapper.find( '.wmde-b-donation-form form:nth-child(1)' );
				const yearly = wrapper.find( '.wmde-b-donation-form form:nth-child(2) button[value="12"]' );
				const paypal = wrapper.find( '[name="payment-method"][value="PPL"]' );

				await miniButton.trigger( 'click' );

				expect( amount15.attributes( 'tabindex' ) ).toBeUndefined();
				expect( yearly.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( paypal.attributes( 'tabindex' ) ).toStrictEqual( '-1' );

				await amount15.trigger( 'click' );
				await firstForm.trigger( 'submit' );

				expect( amount15.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( yearly.attributes( 'tabindex' ) ).toBeUndefined();
				expect( paypal.attributes( 'tabindex' ) ).toStrictEqual( '-1' );

				await yearly.trigger( 'click' );

				expect( amount15.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( yearly.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( paypal.attributes( 'tabindex' ) ).toBeUndefined();

				const backButton = wrapper.find( '.wmde-b-mini-donation-form header div:first-child button' );

				await backButton.trigger( 'click' );

				expect( amount15.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( yearly.attributes( 'tabindex' ) ).toBeUndefined();
				expect( paypal.attributes( 'tabindex' ) ).toStrictEqual( '-1' );

				await backButton.trigger( 'click' );

				expect( amount15.attributes( 'tabindex' ) ).toBeUndefined();
				expect( yearly.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( paypal.attributes( 'tabindex' ) ).toStrictEqual( '-1' );
			} );
		} );
	} );

	describe( 'Use of Funds', () => {
		it( 'shows and hides the use of funds', async () => {
			getWrapper();

			const showUseOfFundsButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:first-child' );
			const closeUseOfFundsButton = wrapper.find( '.wmde-banner-funds-modal-close button' );

			await showUseOfFundsButton.trigger( 'click' );
			await closeUseOfFundsButton.trigger( 'click' );

			const useOfFundsModal = wrapper.findComponent( UseOfFundsModal );

			expect( useOfFundsModal.emitted( 'shown' ).length ).toBe( 1 );
			expect( useOfFundsModal.emitted( 'hide' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
		} );

		it( 'tracks when use of funds is opened', async () => {
			getWrapper();

			const showUseOfFundsButton = wrapper.find( '.wmde-b-mini-banner header > div:first-child > button:first-child' );

			await showUseOfFundsButton.trigger( 'click' );

			expect( tracker.trackEvent ).toHaveBeenCalledWith( new UseOfFundsShownEvent( 'MiniBanner' ) );
		} );
	} );

	describe( 'Soft Close Return Tracking', () => {
		it( 'Does not store a cookie on close', async () => {
			const localCloseTracker: LocalCloseTracker = {
				getItem: vi.fn(),
				setItem: vi.fn()
			};
			getWrapper();
			await wrapper.setProps( { localCloseTracker } );

			const closeButton = wrapper.find( '.wmde-b-mini-banner header > div:last-child button' );

			await closeButton.trigger( 'click' );

			expect( localCloseTracker.setItem ).not.toHaveBeenCalled();
		} );

		it( 'Does not fire submit on return event', async () => {
			const localCloseTracker: LocalCloseTracker = {
				getItem: () => 'I chose not to choose a close choice',
				setItem: vi.fn()
			};
			getWrapper();
			await wrapper.setProps( { localCloseTracker } );

			wrapper.findComponent( MiniDonationForm ).vm.$emit( 'submit' );

			expect( tracker.trackEvent ).not.toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( 'I chose not to choose a close choice' ) );
		} );
	} );
} );
