import { SizeIssueDimensions } from '@src/utils/SizeIssueChecker/SizeIssueDimensions';
import { Vector2 } from '@src/utils/Vector2';

export interface SizeIssueChecker {
	hasSizeIssues( skinSpaceAdjustment: Vector2 ): boolean;
	getDimensions(): SizeIssueDimensions;
}
