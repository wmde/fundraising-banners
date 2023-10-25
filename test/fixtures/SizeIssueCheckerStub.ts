import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
export class SizeIssueCheckerStub implements SizeIssueChecker {
	private readonly _hasSizeIssues: boolean = false;
	public constructor( hasSizeIssues: boolean = false ) {
		this._hasSizeIssues = hasSizeIssues;
	}
	public hasSizeIssues(): boolean {
		return this._hasSizeIssues;
	}
}
