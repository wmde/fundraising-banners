/**
 * @deprecated This is used to map the close events to the legacy close schema
 *             It should be deleted when the new schema is implemented
 */
export enum LegacyCloseSources {
	/** user pressed X button on a desktop banner without softclose */
	MainBanner = 'main-banner-closed',

	/** user pressed X on a mini banner on mobile */
	MiniBanner = 'mini-banner-closed',

	/** user pressed X on a follow up banner on mobile */
	FullPageBanner = 'follow-up-banner-closed',

	/** user pressed "don't bother me again" option on the microbanner/softclosebanner */
	SoftCloseBannerRejected = 'soft-close-banner-rejected',

	/** user clicked already donated on the soft close */
	SoftCloseAlreadyDonated = 'soft-close-already-donated',

	/** when the softclosebanner countdown ends */
	TimeOut = 'time-out-closed',

	/** user clicks on visual editor ("edit") while banner was open */
	PageInteraction = 'page-interaction-closed',

	/** user pressed a maybe-later option (on main banner or softclose banner for example) */
	MaybeLater = 'maybe-later-closed',

	/** user pressed "enough for this year" option on the already donated modal */
	AlreadyDonatedGoAway = 'already-donated-go-away',

	/** user pressed "maybe later" option on the already donated modal */
	AlreadyDonatedMaybeLater = 'already-donated-maybe-later',

	/** user pressed the 'x' close button on the softclose banner */
	SoftCloseXButton = 'softclose-x-button',
}
