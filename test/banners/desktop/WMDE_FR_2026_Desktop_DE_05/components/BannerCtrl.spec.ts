import { afterEach, beforeEach, describe, expect, it, Mock, vi, vitest } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Banner from '@banners/desktop/WMDE_FR_2026_Desktop_DE_05/components/BannerCtrl.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { useOfFundsContent } from '@test/banners/useOfFundsContent';
import { formItems } from '@test/banners/formItems';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import type { Tracker } from '@src/tracking/Tracker';
import { TimerStub } from '@test/fixtures/TimerStub';
import type { Timer } from '@src/utils/Timer';
import { fakeFormActions } from '@test/fixtures/FakeFormActions';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { TimerSpy } from '@test/fixtures/TimerSpy';
import UseOfFundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';

const formModel = useFormModel();
let tracker: Tracker;
const translator = ( key: string ): string => key;

const widthForLargeScreen = 1301;
const widthForSmallScreen = 1300;

describe( 'WMDE_FR_2026_Desktop_DE_05_ctrl', () => {

	let wrapperCache: VueWrapper<any>;
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		resetFormModel( formModel );
		vitest.useFakeTimers();
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
		wrapperCache.unmount();
		vitest.useRealTimers();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): { wrapper: VueWrapper<any>, bannerElements: any } => {
		const wrapper = mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent
			},
			global: {
				mocks: {
					$translate: translator
				},
				provide: {
					translator: { translate: translator },
					dynamicCampaignText: dynamicContent ?? newDynamicContent(),
					currentCampaignTimePercentage: 42,
					formActions: fakeFormActions,
					currencyFormatter: new CurrencyEn(),
					formItems,
					tracker,
					timer: timer ?? new TimerStub()
				}
			}
		} );
		const bannerElements = {
			closeButton: () => wrapper.find( '.wmde-c-desktop-banner__header button' ),
			donatedButton: () => wrapper.find( '.wmde-c-desktop-banner__footer-left > button:last-child' ),
			backButton: () => wrapper.find( '.wmde-c-desktop-banner__back button' ),
			skipLink: () => wrapper.find( '.wmde-b-skip-link' ),
			showUseOfFundsButton: () => wrapper.find( '.wmde-c-desktop-banner__footer-right button' ),
			hideUseOfFundsButton: () => wrapper.find( '.wmde-banner-funds-modal-close button' ),
			firstForm: () => wrapper.find( '.wmde-b-donation-form form:nth-child(1)' ),
			secondForm: () => wrapper.find( '.wmde-b-donation-form form:nth-child(2)' ),
			submitForm: () => wrapper.find<HTMLFormElement>( '.wmde-b-donation-form + form' ),
			submitAmount: () => wrapper.find( '.wmde-b-donation-form + form [name="amount"]' ),
			submitInterval: () => wrapper.find( '.wmde-b-donation-form + form [name="interval"]' ),
			submitPaymentType: () => wrapper.find( '.wmde-b-donation-form + form [name="paymentType"]' ),
			mainErrorMessage: () => wrapper.find( '.wmde-b-donation-form > form:first-child > .wmde-b-callout:first-child' ),
			intervalField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-interval-error)' ),
			amountField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-amount-error)' ),
			paymentMethodField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-payment-type-error)' ),
			intervalOnce: () => wrapper.find( '[name="interval"][value="0"]' ),
			intervalMonthly: () => wrapper.find( '[name="interval"][value="1"]' ),
			intervalYearly: () => wrapper.find( '[name="interval"][value="12"]' ),
			amount15: () => wrapper.find( '[name="amount"][value="15"]' ),
			amount50: () => wrapper.find( '[name="amount"][value="50"]' ),
			amountCustom: () => wrapper.find( '[name="custom-amount"]' ),
			paymentMethodPPL: () => wrapper.find( '[name="paymentMethod"][value="PPL"]' ),
			paymentMethodBEZ: () => wrapper.find( '[name="paymentMethod"][value="BEZ"]' ),
			submitButton: () => wrapper.find( '.wmde-b-donation-form form:nth-child(1) > button' ),
			onceButton: () => wrapper.find( '.wmde-b-donation-form form:nth-child(2) .wmde-b-button:first-child' ),
			yearlyButton: () => wrapper.find( '.wmde-b-donation-form form:nth-child(2) .wmde-b-button:last-child' ),
		};
		wrapperCache = wrapper;
		return { wrapper, bannerElements };
	};

	describe( 'Main Banner', () => {
		it( 'closes banner when window becomes small', () => {
			const { wrapper } = getWrapper();

			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 800 } );
			window.dispatchEvent( new Event( 'resize' ) );

			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 799 } );
			window.dispatchEvent( new Event( 'resize' ) );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MainBanner', CloseChoices.WindowSizeBelowMin ) );
		} );

		it( 'closes banner when the donor hits the close button', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.closeButton().trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', CloseChoices.Close ) );
		} );

		it( 'closes banner when the donor hits the already donated button', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.donatedButton().trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toStrictEqual( new CloseEvent( 'MainBanner', CloseChoices.AlreadyDonated ) );
		} );
	} );

	describe( 'Content', () => {
		it( 'plays the slideshow when the banner becomes visible', async () => {
			const { wrapper } = getWrapper();
			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( wrapper.find( '.wmde-b-slider--playing' ).exists() ).toBeTruthy();
		} );

		it( 'stops the slideshow on form interaction', async () => {
			const { wrapper } = getWrapper();

			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await wrapper.find( '.wmde-b-donation-form' ).trigger( 'click' );

			expect( wrapper.find( '.wmde-b-slider--stopped' ).exists() ).toBeTruthy();
		} );

		it( 'shows the slideshow on small sizes', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: widthForSmallScreen } );
			const { wrapper } = getWrapper();

			expect( wrapper.find( '.wmde-b-slider' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.wmde-b-message__text' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.wmde-b-message__text' ).classes() ).toContain( 'visually-hidden' );
		} );

		it( 'shows the message on large sizes', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: widthForLargeScreen } );
			const { wrapper } = getWrapper();

			expect( wrapper.find( '.wmde-b-slider' ).exists() ).toBeFalsy();
			expect( wrapper.find( '.wmde-b-message__text' ).exists() ).toBeTruthy();
		} );

		it( 'shows the animated visitors vs donors sentence in the message and slide show', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: widthForSmallScreen } );
			const localDynamicContent = newDynamicContent();
			localDynamicContent.visitorsVsDonorsSentence = 'Visitors vs donors sentence';
			const { wrapper } = getWrapper( localDynamicContent );

			expect( wrapper.find( '.wmde-b-slider .wmde-b-animated-text' ).exists() ).toBeTruthy();
			expect( wrapper.find( '.wmde-b-message__text .wmde-b-animated-text' ).exists() ).toBeTruthy();
		} );

		it( 'shows the live date and time in the title', async () => {
			Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: widthForLargeScreen } );
			const localDynamicContent = newDynamicContent();
			localDynamicContent.getCurrentDateAndTime = vi.fn().mockReturnValueOnce( { currentDate: 'Initial Date', currentTime: 'Initial Time' } )
				.mockReturnValueOnce( { currentDate: 'Second Date', currentTime: 'Second Time' } )
				.mockReturnValueOnce( { currentDate: 'Third Date', currentTime: 'Third Time' } );

			const timerSpy = new TimerSpy();
			const { wrapper } = getWrapper( localDynamicContent, timerSpy );

			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Initial Date' );
			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Initial Time' );

			await timerSpy.advanceInterval();

			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Second Date' );
			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Second Time' );

			await timerSpy.advanceInterval();

			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Third Date' );
			expect( wrapper.find( '.wmde-b-message__title' ).text() ).toContain( 'Third Time' );
		} );
	} );

	describe( 'Donation Form', () => {
		it( 'Shows and hides the back button', async () => {
			const { bannerElements } = getWrapper();

			expect( bannerElements.backButton().exists() ).toBeFalsy();

			await bannerElements.intervalOnce().trigger( 'click' );
			await bannerElements.amount15().trigger( 'click' );
			await bannerElements.paymentMethodPPL().trigger( 'click' );
			await bannerElements.firstForm().trigger( 'submit' );

			expect( bannerElements.backButton().exists() ).toBeTruthy();

			await bannerElements.backButton().trigger( 'click' );

			expect( bannerElements.backButton().exists() ).toBeFalsy();
		} );

		it( 'submits opens in a new tab', async () => {
			const { bannerElements } = getWrapper();
			expect( bannerElements.submitForm().attributes( 'target' ) ).toStrictEqual( '_blank' );
		} );

		it( 'submits hides the banner', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.intervalMonthly().trigger( 'click' );
			await bannerElements.amount15().trigger( 'click' );
			await bannerElements.paymentMethodPPL().trigger( 'click' );
			await bannerElements.firstForm().trigger( 'submit' );

			expect( wrapper.emitted( 'bannerSubmitted' ).length ).toStrictEqual( 1 );
		} );

		describe( 'First Page', () => {
			it( 'sets values amounts in the submit form', async () => {
				const { bannerElements } = getWrapper();

				await bannerElements.amount15().trigger( 'click' );
				expect( bannerElements.submitAmount().element.value ).toStrictEqual( '1500' );

				await bannerElements.amount50().trigger( 'click' );
				expect( bannerElements.submitAmount().element.value ).toStrictEqual( '5000' );

				await bannerElements.amountCustom().setValue( '42.00' );
				expect( bannerElements.submitAmount().element.value ).toStrictEqual( '4200' );

				await bannerElements.intervalOnce().trigger( 'click' );
				expect( bannerElements.submitInterval().element.value ).toStrictEqual( '0' );

				await bannerElements.intervalMonthly().trigger( 'click' );
				expect( bannerElements.submitInterval().element.value ).toStrictEqual( '1' );

				await bannerElements.intervalYearly().trigger( 'click' );
				expect( bannerElements.submitInterval().element.value ).toStrictEqual( '12' );

				await bannerElements.paymentMethodPPL().trigger( 'click' );
				expect( bannerElements.submitPaymentType().element.value ).toStrictEqual( 'PPL' );

				await bannerElements.paymentMethodBEZ().trigger( 'click' );
				expect( bannerElements.submitPaymentType().element.value ).toStrictEqual( 'BEZ' );
			} );

			it( 'shows and hides the first page errors', async () => {
				const { bannerElements } = getWrapper();

				expect( bannerElements.mainErrorMessage().exists() ).toBeFalsy();
				expect( bannerElements.intervalField().attributes( 'data-error' ) ).toBeUndefined();
				expect( bannerElements.amountField().attributes( 'data-error' ) ).toBeUndefined();
				expect( bannerElements.paymentMethodField().attributes( 'data-error' ) ).toBeUndefined();

				await bannerElements.firstForm().trigger( 'submit' );

				expect( bannerElements.mainErrorMessage().exists() ).toBeTruthy();
				expect( document.activeElement ).toStrictEqual( bannerElements.mainErrorMessage().element );
				expect( bannerElements.intervalField().attributes( 'data-error' ) ).toBeTruthy();
				expect( bannerElements.amountField().attributes( 'data-error' ) ).toBeTruthy();
				expect( bannerElements.paymentMethodField().attributes( 'data-error' ) ).toBeTruthy();

				await bannerElements.intervalMonthly().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );

				expect( bannerElements.mainErrorMessage().exists() ).toBeFalsy();
				expect( bannerElements.intervalField().attributes( 'data-error' ) ).toBeUndefined();
				expect( bannerElements.amountField().attributes( 'data-error' ) ).toBeUndefined();
				expect( bannerElements.paymentMethodField().attributes( 'data-error' ) ).toBeUndefined();
			} );

			it( 'submits to the donation form when a recurring interval is selected', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalMonthly().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				expect( submitForm.element.submit ).toHaveBeenCalledOnce();
				expect( submitForm.attributes( 'action' ) ).contains( 'with-address' );
				expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerSubmitEvent( 'MainDonationForm', 'recurring' ) );
			} );

			it( 'goes to page 2 when a once off donation is selected', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				expect( submitForm.element.submit ).not.toHaveBeenCalled();
			} );

		} );

		describe( 'Second Page', () => {
			it( 'fires the shown event the first time the second page is shown', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await bannerElements.backButton().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				expect( tracker.trackEvent ).toHaveBeenNthCalledWith( 1, new FormStepShownEvent( 'UpgradeToYearlyForm' ) );
			} );

			it( 'submits to the donation form when once off is selected on page 2', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalYearly().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await bannerElements.onceButton().trigger( 'click' );

				expect( bannerElements.submitInterval().element.value ).toStrictEqual( '0' );
				expect( submitForm.element.submit ).toHaveBeenCalled();
				expect( submitForm.attributes( 'action' ) ).contains( 'with-address' );
				expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerSubmitEvent( 'UpgradeToYearlyForm', 'non-recurring' ) );
			} );

			it( 'submits to the donation form when yearly is selected on page 2', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalYearly().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await bannerElements.yearlyButton().trigger( 'click' );

				expect( bannerElements.submitInterval().element.value ).toStrictEqual( '12' );
				expect( submitForm.element.submit ).toHaveBeenCalled();
				expect( submitForm.attributes( 'action' ) ).contains( 'with-address' );
				expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerSubmitEvent( 'UpgradeToYearlyForm', 'recurring' ) );
			} );
		} );

		describe( 'Accessibility', () => {
			it( 'Focuses the first form when the skip link is clicked', async () => {
				const { bannerElements } = getWrapper();

				await bannerElements.skipLink().trigger( 'click' );
				expect( document.activeElement ).toStrictEqual( bannerElements.firstForm().element );
			} );

			it( 'Focuses the second form when the skip link is clicked', async () => {
				const { bannerElements } = getWrapper();

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await vitest.runAllTimersAsync();

				await bannerElements.skipLink().trigger( 'click' );
				expect( document.activeElement ).toStrictEqual( bannerElements.secondForm().element );
			} );

			it( 'Focuses the second form when it becomes visible', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( bannerElements.secondForm().element );
			} );

			it( 'Focuses the first form when the back button is clicked', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await vitest.runAllTimersAsync();

				await bannerElements.backButton().trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( document.activeElement ).toStrictEqual( bannerElements.firstForm().element );
			} );

			it( 'Handles showing and hiding the form steps from screen readers', async () => {
				const { bannerElements } = getWrapper();

				expect( bannerElements.firstForm().attributes( 'aria-hidden' ) ).toBeUndefined();
				expect( bannerElements.secondForm().attributes( 'aria-hidden' ) ).toStrictEqual( 'true' );

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				await vitest.runAllTimersAsync();

				expect( bannerElements.firstForm().attributes( 'aria-hidden' ) ).toStrictEqual( 'true' );
				expect( bannerElements.secondForm().attributes( 'aria-hidden' ) ).toBeUndefined();

				await bannerElements.backButton().trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( bannerElements.firstForm().attributes( 'aria-hidden' ) ).toBeUndefined();
				expect( bannerElements.secondForm().attributes( 'aria-hidden' ) ).toStrictEqual( 'true' );
			} );

			it( 'Handles tabindexes on step change', async () => {
				const { bannerElements } = getWrapper();
				const submitForm = bannerElements.submitForm();
				submitForm.element.submit = vi.fn();

				expect( bannerElements.intervalOnce().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.amount15().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.paymentMethodPPL().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.submitButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.onceButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.yearlyButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );

				await bannerElements.intervalOnce().trigger( 'click' );
				await bannerElements.amount15().trigger( 'click' );
				await bannerElements.paymentMethodPPL().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );
				await vitest.runAllTimersAsync();

				expect( bannerElements.intervalOnce().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.amount15().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.paymentMethodPPL().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.submitButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.onceButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.yearlyButton().attributes( 'tabindex' ) ).toBeUndefined();

				await bannerElements.backButton().trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( bannerElements.intervalOnce().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.amount15().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.paymentMethodPPL().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.submitButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.onceButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.yearlyButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
			} );
		} );
	} );

	describe( 'Use of Funds', () => {

		it( 'shows and hides the use of funds', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.showUseOfFundsButton().trigger( 'click' );
			await bannerElements.hideUseOfFundsButton().trigger( 'click' );

			const useOfFundsModal = wrapper.findComponent( UseOfFundsModal );

			expect( useOfFundsModal.emitted( 'shown' ).length ).toBe( 1 );
			expect( useOfFundsModal.emitted( 'hide' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'modalOpened' ).length ).toStrictEqual( 1 );
			expect( wrapper.emitted( 'modalClosed' ).length ).toStrictEqual( 1 );
			expect( showCallback ).toHaveBeenCalledOnce();
			expect( closeCallback ).toHaveBeenCalledOnce();
		} );
	} );

	describe( 'Soft Close Return Tracking', () => {
		it( 'Does not have the local close tracker', async () => {
			const { wrapper } = getWrapper();
			expect( wrapper.props().localCloseTracker ).toBeUndefined();
		} );
	} );
} );
