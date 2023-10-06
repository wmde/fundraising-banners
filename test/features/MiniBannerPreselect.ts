import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';

const expectShowsFullPageWhenPreselectIsClicked = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button-preselect' ).trigger( 'click' );

	expect( wrapper.classes() ).toContain( 'wmde-banner-wrapper--full-page' );
};

const expectPreselectsAmountWhenPreselectIsClicked = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button-preselect' ).trigger( 'click' );

	expect( wrapper.find<HTMLInputElement>( '.wmde-banner-select-group-input:checked' ).element.value ).toStrictEqual( '5' );
};

const expectTrackingEventIsFiredWhenPreselectIsClicked = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.wmde-banner-mini-button-preselect' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledOnce();
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new MobileMiniBannerExpandedEvent( 'preselected' ) );
};

export const miniBannerPreselectFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectShowsFullPageWhenPreselectIsClicked,
	expectPreselectsAmountWhenPreselectIsClicked,
	expectTrackingEventIsFiredWhenPreselectIsClicked
};
