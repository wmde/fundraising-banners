import { Vector2 } from '@src/utils/Vector2';
import { SizeIssueDimensions } from '@src/utils/SizeIssueChecker/SizeIssueDimensions';

export class SizeIssueChecker {
	bannerDimensions: Vector2;

	/**
	 * This is for adding or removing space from the banner dimensions to allow individual
	 * banners to adjust the parameters of when they are shown
	 */
	spaceAdjustment: Vector2;

	constructor( bannerDimensions: Vector2, spaceAdjustment: Vector2 = null ) {
		this.bannerDimensions = bannerDimensions;
		this.spaceAdjustment = spaceAdjustment ?? new Vector2( 0, 0 );
	}

	public hasSizeIssues(): boolean {
		const allowedBannerDimensions = this.bannerDimensions.add( this.spaceAdjustment );

		return window.innerWidth < allowedBannerDimensions.x ||
			window.innerHeight < allowedBannerDimensions.y;
	}

	public getDimensions(): SizeIssueDimensions {
		return {
			bannerHeight: this.bannerDimensions.y,
			screen: {
				width: screen.width,
				height: screen.height
			},
			window: {
				width: window.innerWidth,
				height: window.innerHeight
			},
			windowOuter: {
				width: window.outerWidth,
				height: window.outerHeight
			}
		};
	}
}
