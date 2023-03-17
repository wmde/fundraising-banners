import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export class PassingSizeIssueChecker implements SizeIssueChecker {
	public hasSizeIssues(): boolean {
		return false;
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
