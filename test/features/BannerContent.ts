import { VueWrapper } from '@vue/test-utils';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { expect, vi } from 'vitest';
import { newDynamicContent } from '@test/banners/dynamicCampaignContent';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const expectSlideShowPlaysWhenBecomesVisible = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.setProps( { bannerState: BannerStates.Visible } );

	await vi.runOnlyPendingTimersAsync();

	expect( wrapper.find( '.wmde-banner-slider--playing' ).exists() ).toBeTruthy();
};

const expectSlideShowStopsOnFormInteraction = async ( wrapper: VueWrapper<any> ): Promise<any> => {
	await wrapper.setProps( { bannerState: BannerStates.Visible } );
	await wrapper.find( '.wmde-banner-form' ).trigger( 'click' );

	await vi.runOnlyPendingTimersAsync();

	expect( wrapper.find( '.wmde-banner-slider--stopped' ).exists() ).toBeTruthy();
};

const expectShowsSlideShowOnSmallSizes = async ( getWrapper: () => VueWrapper<any>, minWidthForLargeScreen: number ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: minWidthForLargeScreen } );
	const wrapper = getWrapper();

	expect( wrapper.find( '.wmde-banner-slider' ).exists() ).toBeTruthy();
};

const expectShowsMessageOnLargeSizes = async ( getWrapper: () => VueWrapper<any>, minWidthForLargeScreen: number ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: minWidthForLargeScreen + 1 } );
	const wrapper = getWrapper();

	expect( wrapper.find( '.wmde-banner-message' ).exists() ).toBeTruthy();
};

const expectHidesAnimatedVisitorsVsDonorsSentenceInMessage = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );
	const wrapper = getWrapper( null );

	expect( wrapper.find( '.wmde-banner-message .wmde-banner-text-animated-highlight' ).exists() ).toBeFalsy();
};
const expectShowsAnimatedVisitorsVsDonorsSentenceInMessage = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.visitorsVsDonorsSentence = 'Visitors vs donors sentence';
	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-message .wmde-banner-text-animated-highlight' ).exists() ).toBeTruthy();
};

const expectHidesAnimatedVisitorsVsDonorsSentenceInSlideShow = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );
	const wrapper = getWrapper( null );

	expect( wrapper.find( '.wmde-banner-slider .wmde-banner-text-animated-highlight' ).exists() ).toBeFalsy();
};
const expectShowsAnimatedVisitorsVsDonorsSentenceInSlideShow = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.visitorsVsDonorsSentence = 'Visitors vs donors sentence';
	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-slider .wmde-banner-text-animated-highlight' ).exists() ).toBeTruthy();
};

const expectShowsLiveDateAndTimeInMessage = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.getCurrentDateAndTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveDateAndTimeInSlideshow = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.getCurrentDateAndTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveTimeInMessage = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1301 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.getCurrentTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveTimeInSlideshow = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1300 } );
	const dynamicContent = newDynamicContent();
	dynamicContent.getCurrentTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-slider' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveDateAndTimeInMiniBanner = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	const dynamicContent = newDynamicContent();
	// There are 2 live text elements mounted at the same time in the mobile banners meaning it will be initialised twice
	dynamicContent.getCurrentDateAndTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveDateAndTimeInFullPageBanner = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	const dynamicContent = newDynamicContent();
	// There are 2 live text elements mounted at the same time in the mobile banners meaning it will be initialised twice
	dynamicContent.getCurrentDateAndTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveTimeInMiniBanner = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	const dynamicContent = newDynamicContent();
	// There are 2 live text elements mounted at the same time in the mobile banners meaning it will be initialised twice
	dynamicContent.getCurrentTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-mini-slideshow' ).text() ).toContain( 'Third Date and Time' );
};

const expectShowsLiveTimeInFullPageBanner = async ( getWrapper: ( dynamicContent: DynamicContent ) => VueWrapper<any> ): Promise<any> => {
	const dynamicContent = newDynamicContent();
	// There are 2 live text elements mounted at the same time in the mobile banners meaning it will be initialised twice
	dynamicContent.getCurrentTime = vi.fn().mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Initial Date and Time' )
		.mockReturnValueOnce( 'Second Date and Time' )
		.mockReturnValueOnce( 'Third Date and Time' );

	const wrapper = getWrapper( dynamicContent );

	await wrapper.find( '.wmde-banner-mini-button' ).trigger( 'click' );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Initial Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Second Date and Time' );

	await vi.advanceTimersByTimeAsync( 1000 );

	expect( wrapper.find( '.wmde-banner-message' ).text() ).toContain( 'Third Date and Time' );
};

export const bannerContentFeatures: Record<string, ( wrapper: VueWrapper<any> ) => Promise<any>> = {
	expectSlideShowPlaysWhenBecomesVisible,
	expectSlideShowStopsOnFormInteraction
};

export const bannerContentDisplaySwitchFeatures: Record<string, ( getWrapper: () => VueWrapper<any>, minWidthForLargeScreen: number ) => Promise<any>> = {
	expectShowsSlideShowOnSmallSizes,
	expectShowsMessageOnLargeSizes
};

export const bannerContentAnimatedTextFeatures: Record<string, ( getWrapper: () => VueWrapper<any> ) => Promise<any>> = {
	expectHidesAnimatedVisitorsVsDonorsSentenceInMessage,
	expectShowsAnimatedVisitorsVsDonorsSentenceInMessage,
	expectHidesAnimatedVisitorsVsDonorsSentenceInSlideShow,
	expectShowsAnimatedVisitorsVsDonorsSentenceInSlideShow
};

export const bannerContentDateAndTimeFeatures: Record<string, ( getWrapper: () => VueWrapper<any> ) => Promise<any>> = {
	expectShowsLiveDateAndTimeInMessage,
	expectShowsLiveDateAndTimeInSlideshow,
	expectShowsLiveTimeInMessage,
	expectShowsLiveTimeInSlideshow,
	expectShowsLiveDateAndTimeInMiniBanner,
	expectShowsLiveDateAndTimeInFullPageBanner,
	expectShowsLiveTimeInMiniBanner,
	expectShowsLiveTimeInFullPageBanner
};
