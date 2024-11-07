export enum CloseChoices {
	/** user clicked close button */
	Close = 'close',
	/** user clicked close button on a mobile full page banner */
	Hide = 'hide',
	/** user clicked maybe later button */
	MaybeLater = 'maybe-later',
	/** user ignored soft close timer */
	TimeOut = 'time-out',
	/** user clicked a go away for campaign button */
	NoMoreBannersForCampaign = 'no-more-banners',
	/** user clicked on the already donated link */
	AlreadyDonated = 'already-donated',
	/** window was resized below the threshold */
	WindowSizeBelowMin = 'window-size-below-min',
}
