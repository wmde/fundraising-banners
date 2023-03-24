import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export class SizeIssueCheckerStub implements SizeIssueChecker {
	private readonly _hasSizeIssues: boolean = false;

	public constructor( hasSizeIssues: boolean = false ) {
		this._hasSizeIssues = hasSizeIssues;
	}

	public getDimensions(): WindowDimensions {
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

	public hasSizeIssues(): boolean {
		return this._hasSizeIssues;
	}
}
