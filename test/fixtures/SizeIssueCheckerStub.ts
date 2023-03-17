import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export class SizeIssueCheckerStub implements SizeIssueChecker {
	private hasSizeIssue: boolean;

	constructor( hasSizeIssue: boolean = false ) {
		this.hasSizeIssue = hasSizeIssue;
	}

	getDimensions(): WindowDimensions {
		return {
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
