import { Vector2 } from '@src/utils/Vector2';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export class WindowSizeIssueChecker implements SizeIssueChecker {
	/**
	 * This is for adding or removing space from the banner dimensions to allow individual
	 * banners to adjust the parameters of when they are shown
	 */
	private _manualSpaceAdjustment: Vector2 = Vector2.ZERO;

	public constructor( manualSpaceAdjustment: Vector2 = Vector2.ZERO ) {
		this._manualSpaceAdjustment = manualSpaceAdjustment;
	}

	public hasSizeIssues( bannerDimensions: Vector2, skinSpaceAdjustment: Vector2 ): boolean {
		const allowedBannerDimensions = bannerDimensions
			.add( this._manualSpaceAdjustment )
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
