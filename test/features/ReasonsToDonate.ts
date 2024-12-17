import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { Tracker } from '@src/tracking/Tracker';
import { ReasonsToDonateShownEvent } from '@src/tracking/events/ReasonsToDonateShownEvent';
import { ReasonsToDonateCTAClickedEvent } from '@src/tracking/events/ReasonsToDonateCTAClickedEvent';
import { ReasonsToDonateItemClickedEvent } from '@src/tracking/events/ReasonsToDonateItemClickedEvent';
import ReasonsToDonate from '@src/components/ReasonsToDonate/ReasonsToDonate.vue';

const expectContainsReasonsToDonateDialogue = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	expect( wrapper.findComponent( ReasonsToDonate ).exists() ).toBeTruthy();
};

const expectScrollsToFormWhenCallToActionIsClicked = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-10-reasons-cta button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
};

const expectScrollsToFormWhenCallToActionIsClickedUsingTenGoodReasonsSticker = async ( wrapper: VueWrapper<any>, pageScroller: PageScroller ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );
	await wrapper.find( '.wmde-banner-10-reasons-cta button' ).trigger( 'click' );

	expect( pageScroller.scrollIntoView ).toHaveBeenCalledOnce();
	expect( pageScroller.scrollIntoView ).toHaveBeenCalledWith( '.wmde-banner-form' );
};

const expectTracksReasonsToDonateShownEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {

	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledOnce();
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new ReasonsToDonateShownEvent() );
};

const expectTracksReasonsToDonateShownEventUsingTenGoodReasonsSticker = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {

	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledOnce();
	expect( tracker.trackEvent ).toHaveBeenCalledWith( new ReasonsToDonateShownEvent() );
};

const expectTracksReasonsToDonateCTAClickedEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	await wrapper.find( '.wmde-banner-10-reasons-cta button' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledTimes( 2 );
	// expect( tracker.trackEvent ).toBeCalledWith( new ReasonsToDonateShownEvent() );
	expect( tracker.trackEvent ).toBeCalledWith( new ReasonsToDonateCTAClickedEvent() );
};

const expectTracksReasonsToDonateCTAClickedEventUsingTenGoodReasonsSticker = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	await wrapper.find( '.wmde-banner-10-reasons-cta button' ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledTimes( 2 );
	expect( tracker.trackEvent ).toBeCalledWith( new ReasonsToDonateCTAClickedEvent() );
};

const expectTracksReasonsToDonateItemClickedEvent = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	const itemNumber = '5';
	await wrapper.find( `.wmde-banner-10-reasons-accordion-item:nth-child(${itemNumber}) .wmde-banner-10-reasons-accordion-title` ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledWith( new ReasonsToDonateItemClickedEvent( itemNumber ) );
};

const expectTracksReasonsToDonateItemClickedEventUsingTenGoodReasonsSticker = async ( wrapper: VueWrapper<any>, tracker: Tracker ): Promise<any> => {
	await wrapper.find( '.ten-good-reasons-sticker-text' ).trigger( 'click' );

	const itemNumber = '5';
	await wrapper.find( `.wmde-banner-10-reasons-accordion-item:nth-child(${itemNumber}) .wmde-banner-10-reasons-accordion-title` ).trigger( 'click' );

	expect( tracker.trackEvent ).toHaveBeenCalledWith( new ReasonsToDonateItemClickedEvent( itemNumber ) );
};

export const useReasonsToDonateFeatures: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectContainsReasonsToDonateDialogue,
	expectTracksReasonsToDonateShownEvent,
	expectTracksReasonsToDonateCTAClickedEvent,
	expectTracksReasonsToDonateItemClickedEvent
};

export const useReasonsToDonateFeaturesUsingTenGoodReasonsSticker: Record<string, ( wrapper: VueWrapper<any>, tracker: Tracker ) => Promise<any>> = {
	expectContainsReasonsToDonateDialogue,
	expectTracksReasonsToDonateShownEventUsingTenGoodReasonsSticker,
	expectTracksReasonsToDonateCTAClickedEventUsingTenGoodReasonsSticker,
	expectTracksReasonsToDonateItemClickedEventUsingTenGoodReasonsSticker
};

export const useReasonsToDonateScrollFeatures: Record<string, ( wrapper: VueWrapper<any>, pageScroller: PageScroller ) => Promise<any>> = {
	expectScrollsToFormWhenCallToActionIsClicked
};

export const useReasonsToDonateScrollFeaturesUsingTenGoodReasonsSticker: Record<string, ( wrapper: VueWrapper<any>, pageScroller: PageScroller ) => Promise<any>> = {
	expectScrollsToFormWhenCallToActionIsClickedUsingTenGoodReasonsSticker
};
