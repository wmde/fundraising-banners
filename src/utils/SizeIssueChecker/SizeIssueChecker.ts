import { SizeIssueDimensions } from '@src/utils/SizeIssueChecker/SizeIssueDimensions';

export interface SizeIssueChecker {
	hasSizeIssues(): boolean;
	getDimensions(): SizeIssueDimensions;
}
