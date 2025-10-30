import { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { CloseChoices } from '@src/domain/CloseChoices';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { submitMainDonationForm } from '@test/features/forms/subForms/MainDonationForm';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Tracker } from '@src/tracking/Tracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';

const expectStoresCloseChoiceInBannerWithoutSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'MiniBanner', CloseChoices.Close );
};

const expectStoresMaybeLateCloseChoice = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'SoftClose', CloseChoices.MaybeLater );
};

const expectStoresXCloseChoice = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close .wmde-banner-close' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'SoftClose', CloseChoices.XIconClose );
};

const expectStoresCloseCloseChoice = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'SoftClose', CloseChoices.Close );
};

const expectStoresAlreadyDonatedCloseChoice = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-close-button' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-soft-close-button-already-donated' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'SoftClose', CloseChoices.AlreadyDonated );
};

const expectStoresAlreadyDonatedCloseChoiceInBannerWithoutSoftClose = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: vi.fn(),
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	await wrapper.find( '.wmde-banner-mini-already-donated-button' ).trigger( 'click' );

	expect( localCloseTracker.setItem ).toHaveBeenCalledWith( 'MiniBanner', CloseChoices.AlreadyDonated );
};

const expectEmitsBannerSubmitOnReturnEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: () => 'I chose not to choose a close choice',
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitMainDonationForm( wrapper, Intervals.YEARLY, '10', PaymentMethods.PAYPAL );

	expect( tracker.trackEvent ).toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( 'I chose not to choose a close choice' ) );
};

const expectDoesNotEmitsBannerSubmitOnReturnEventWhenLocalStorageItemIsMissing = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	const localCloseTracker: LocalCloseTracker = {
		getItem: () => '',
		setItem: vi.fn()
	};
	await wrapper.setProps( { localCloseTracker } );
	const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
	submitForm.element.submit = vi.fn();

	await submitMainDonationForm( wrapper, Intervals.YEARLY, '10', PaymentMethods.PAYPAL );

	expect( tracker.trackEvent ).not.toHaveBeenCalledWith( new BannerSubmitOnReturnEvent( '' ) );
};

export const softCloseSubmitTrackingFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectStoresCloseChoiceInBannerWithoutSoftClose,
	expectStoresMaybeLateCloseChoice,
	expectStoresXCloseChoice,
	expectStoresCloseCloseChoice,
	expectStoresAlreadyDonatedCloseChoice,
	expectStoresAlreadyDonatedCloseChoiceInBannerWithoutSoftClose,
	expectEmitsBannerSubmitOnReturnEvent,
	expectDoesNotEmitsBannerSubmitOnReturnEventWhenLocalStorageItemIsMissing
};
