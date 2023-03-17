import { Vector2 } from '@src/utils/Vector2';
import { SizeIssueDimensions } from '@src/utils/SizeIssueChecker/SizeIssueDimensions';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';

export class WindowSizeIssueChecker implements SizeIssueChecker {
	bannerDimensions: Vector2;

	/**
	 * This is for adding or removing space from the banner dimensions to allow individual
	 * banners to adjust the parameters of when they are shown
	 */
	manualSpaceAdjustment: Vector2;

	constructor( bannerDimensions: Vector2, manualSpaceAdjustment: Vector2 = null ) {
		this.bannerDimensions = bannerDimensions;
		this.manualSpaceAdjustment = manualSpaceAdjustment ?? new Vector2( 0, 0 );
	}

	public hasSizeIssues( skinSpaceAdjustment: Vector2 ): boolean {
		const allowedBannerDimensions = this.bannerDimensions
			.add( this.manualSpaceAdjustment )
			.add( skinSpaceAdjustment );

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
