import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { SizeIssueDimensions } from '@src/utils/SizeIssueChecker/SizeIssueDimensions';

export class SizeIssueCheckerStub implements SizeIssueChecker {
	private hasSizeIssue: boolean;

	constructor( hasSizeIssue: boolean = false ) {
		this.hasSizeIssue = hasSizeIssue;
	}

	getDimensions(): SizeIssueDimensions {
		return {
			bannerHeight: 0,
			screen: {
				width: 0,
				height: 0
			},
			window: {
				width: 0,
				height: 0
			},
			windowOuter: {
				width: 0,
				height: 0
			}
		};
	}

	hasSizeIssues(): boolean {
		return this.hasSizeIssue;
	}
}
