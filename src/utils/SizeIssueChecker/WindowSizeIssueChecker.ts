import { Vector2 } from '@src/utils/Vector2';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export class WindowSizeIssueChecker implements SizeIssueChecker {
	bannerDimensions: Vector2;

	/**
	 * This is for adding or removing space from the banner dimensions to allow individual
	 * banners to adjust the parameters of when they are shown
	 */
	manualSpaceAdjustment: Vector2;

	constructor( manualSpaceAdjustment: Vector2 = null ) {
		this.manualSpaceAdjustment = manualSpaceAdjustment ?? Vector2.zero;
	}

	public hasSizeIssues( bannerDimensions: Vector2, skinSpaceAdjustment: Vector2 ): boolean {
		this.bannerDimensions = bannerDimensions;

		const allowedBannerDimensions = bannerDimensions
			.add( this.manualSpaceAdjustment )
			.add( skinSpaceAdjustment );

		return window.innerWidth < allowedBannerDimensions.x ||
			window.innerHeight < allowedBannerDimensions.y;
	}

	public getDimensions(): WindowDimensions {
		return {
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
