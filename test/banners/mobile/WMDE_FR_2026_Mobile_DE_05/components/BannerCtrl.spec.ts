import { afterEach, beforeEach, describe, expect, it, Mock, vi, vitest } from 'vitest';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Banner from '@banners/mobile/WMDE_FR_2026_Mobile_DE_05/components/BannerCtrl.vue';
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
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';

let pageScroller: PageScroller;
let tracker: Tracker;
const formModel = useFormModel();
const translator = ( key: string ): string => key;
describe( 'WMDE_FR_2026_Mobile_DE_05_ctrl', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	let wrapperCache: VueWrapper<any>;
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
		wrapperCache.unmount();
		vitest.useRealTimers();
	} );

	const getWrapper = ( dynamicContent: DynamicContent = null, timer: Timer = null ): { wrapper: VueWrapper<any>, bannerElements: any } => {
		// attachTo the document body to fix an issue with Vue Test Utils where
		// clicking a submit button in a form does not fire the submit event
		const wrapper = mount( Banner, {
			attachTo: document.body,
			props: {
				bannerState: BannerStates.Pending,
				useOfFundsContent,
				pageScroller,
				remainingImpressions: 10
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
		const bannerElements = {
			miniCloseButton: () => wrapper.find( '.wmde-b-mini-banner header > div:last-child button' ),
			modalCloseButton: () => wrapper.find( '.wmde-b-modal-banner header button' ),
			alreayDonated: () => wrapper.find( '.wmde-b-mini-banner header > div:first-child button:last-child' ),
			showUseOfFundsButton: () => wrapper.find( '.wmde-b-mini-banner header > div:first-child button:first-child' ),
			hideUseOfFundsButton: () => wrapper.find( '.wmde-banner-funds-modal-close button' ),
			donate10Button: () => wrapper.find( '.wmde-b-mini-banner footer > div:first-child button' ),
			donateOtherButton: () => wrapper.find( '.wmde-b-mini-banner footer > div:last-child button' ),
			slider: () => wrapper.find( '.wmde-b-slider' ),
			firstForm: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(1) form' ),
			secondForm: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(2) form' ),
			submitForm: () => wrapper.find<HTMLFormElement>( '.wmde-b-donation-form > form' ),
			submitAmount: () => wrapper.find( '.wmde-b-donation-form > form [name="amount"]' ),
			submitInterval: () => wrapper.find( '.wmde-b-donation-form > form [name="interval"]' ),
			submitPaymentType: () => wrapper.find( '.wmde-b-donation-form > form [name="paymentType"]' ),
			mainErrorMessage: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(1) form > .wmde-b-callout:first-child' ),
			backButton: () => wrapper.find( '.wmde-b-donation-form__nav button' ),
			intervalField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-interval-error)' ),
			amountField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-amount-error)' ),
			paymentMethodField: () => wrapper.find( '.wmde-b-field-container:has(#wmde-b-payment-type-error)' ),
			intervalOnce: () => wrapper.find( '[name="interval"][value="0"]' ),
			intervalMonthly: () => wrapper.find( '[name="interval"][value="1"]' ),
			intervalYearly: () => wrapper.find( '[name="interval"][value="12"]' ),
			amount5: () => wrapper.find( '[name="amount"][value="5"]' ),
			amount10: () => wrapper.find( '[name="amount"][value="10"]' ),
			amount15: () => wrapper.find( '[name="amount"][value="15"]' ),
			amount25: () => wrapper.find( '[name="amount"][value="25"]' ),
			amount50: () => wrapper.find( '[name="amount"][value="50"]' ),
			amount100: () => wrapper.find( '[name="amount"][value="100"]' ),
			amountCustom: () => wrapper.find( '[name="custom-amount"]' ),
			paymentMethodPPL: () => wrapper.find( '[name="paymentMethod"][value="PPL"]' ),
			paymentMethodBEZ: () => wrapper.find( '[name="paymentMethod"][value="BEZ"]' ),
			submitButton: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(1) form > button' ),
			onceButton: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(2) form .wmde-b-button:first-child' ),
			yearlyButton: () => wrapper.find( '.wmde-b-donation-form .keen-slider__slide:nth-child(2) form .wmde-b-button:last-child' ),
		};
		wrapperCache = wrapper;
		return { wrapper, bannerElements };
	};

	describe( 'Mini Banner', () => {

		it( 'shows the donation form', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.donate10Button().trigger( 'click' );

			expect( wrapper.classes() ).toContain( 'wmde-b-mobile-banner--full-page' );
		} );

		it( 'emits a content changed event when the donation form is shown', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.donate10Button().trigger( 'click' );

			expect( wrapper.emitted( 'bannerContentChanged' ).length ).toBe( 1 );
		} );

		it( 'emits a close event', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.miniCloseButton().trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.Close ) );
		} );

		it( 'emits the already donated close event', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.alreayDonated().trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'MiniBanner', CloseChoices.AlreadyDonated ) );
		} );

		it( 'plays the slideshow once the banner becomes visible', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await wrapper.setProps( { bannerState: BannerStates.Visible } );

			expect( bannerElements.slider().classes() ).toContain( 'wmde-b-slider--playing' );
		} );

		it( 'stops the slideshow once the donation form is shown', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await wrapper.setProps( { bannerState: BannerStates.Visible } );
			await bannerElements.donateOtherButton().trigger( 'click' );

			expect( bannerElements.slider().classes() ).toContain( 'wmde-b-slider--stopped' );
		} );

		it( 'Uses the default amounts when the donate button is clicked', async () => {
			const { bannerElements } = getWrapper();

			await bannerElements.donateOtherButton().trigger( 'click' );

			expect( bannerElements.amount5().exists() ).toBeTruthy();
			expect( bannerElements.amount15().exists() ).toBeTruthy();
			expect( bannerElements.amount25().exists() ).toBeTruthy();
			expect( bannerElements.amount50().exists() ).toBeTruthy();
			expect( bannerElements.amount100().exists() ).toBeTruthy();
		} );

		it( 'Uses the alternate amounts when the donate with amount button is clicked', async () => {
			const { bannerElements } = getWrapper();

			await bannerElements.donate10Button().trigger( 'click' );

			expect( bannerElements.amount10().exists() ).toBeTruthy();
			expect( bannerElements.amount15().exists() ).toBeTruthy();
			expect( bannerElements.amount25().exists() ).toBeTruthy();
			expect( bannerElements.amount50().exists() ).toBeTruthy();
			expect( bannerElements.amount100().exists() ).toBeTruthy();
		} );

		it( 'emits the modal opened event', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.donateOtherButton().trigger( 'click' );

			expect( wrapper.emitted( 'modalOpened' ).length ).toBe( 1 );
		} );

		describe( 'Accessibility', () => {
			it( 'removes interactables from the tabbing order when the full banner is opened', async () => {
				const { bannerElements } = getWrapper();

				expect( bannerElements.miniCloseButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.showUseOfFundsButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.alreayDonated().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.donate10Button().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.donateOtherButton().attributes( 'tabindex' ) ).toBeUndefined();

				await bannerElements.donateOtherButton().trigger( 'click' );

				expect( bannerElements.miniCloseButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.showUseOfFundsButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.alreayDonated().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.donate10Button().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
				expect( bannerElements.donateOtherButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
			} );

			it( 'focuses the first form when when the full banner is opened', async () => {
				const { bannerElements } = getWrapper();

				await bannerElements.donateOtherButton().trigger( 'click' );

				expect( document.activeElement ).toStrictEqual( bannerElements.firstForm().element );
			} );
		} );
	} );

	describe( 'Full Page Banner', () => {
		it( 'emits the close event', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.modalCloseButton().trigger( 'click' );

			expect( wrapper.emitted( 'bannerClosed' ).length ).toBe( 1 );
			expect( wrapper.emitted( 'bannerClosed' )[ 0 ][ 0 ] ).toEqual( new CloseEvent( 'FullPageBanner', CloseChoices.Hide ) );
		} );

		it( 'emits the modal closed event', async () => {
			const { wrapper, bannerElements } = getWrapper();

			await bannerElements.donateOtherButton().trigger( 'click' );
			await bannerElements.modalCloseButton().trigger( 'click' );

			expect( wrapper.emitted( 'modalClosed' ).length ).toBe( 1 );
		} );
	} );

	describe( 'Donation Form', () => {
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

				expect( tracker.trackEvent ).toHaveBeenCalledWith( new FormStepShownEvent( 'UpgradeToYearlyForm' ) );

				tracker.trackEvent = vi.fn();

				await bannerElements.backButton().trigger( 'click' );
				await bannerElements.firstForm().trigger( 'submit' );

				expect( tracker.trackEvent ).not.toHaveBeenCalledWith( new FormStepShownEvent( 'UpgradeToYearlyForm' ) );
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
				expect( bannerElements.backButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
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
				expect( bannerElements.backButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.onceButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.yearlyButton().attributes( 'tabindex' ) ).toBeUndefined();

				await bannerElements.backButton().trigger( 'click' );
				await vitest.runAllTimersAsync();

				expect( bannerElements.intervalOnce().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.amount15().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.paymentMethodPPL().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.submitButton().attributes( 'tabindex' ) ).toBeUndefined();
				expect( bannerElements.backButton().attributes( 'tabindex' ) ).toStrictEqual( '-1' );
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
