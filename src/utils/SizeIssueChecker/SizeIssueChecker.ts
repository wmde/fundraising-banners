import { Vector2 } from '@src/utils/Vector2';
import { WindowDimensions } from '@src/utils/SizeIssueChecker/WindowDimensions';

export interface SizeIssueChecker {
	hasSizeIssues( bannerDimensions: Vector2, skinSpaceAdjustment: Vector2 ): boolean;
	getDimensions(): WindowDimensions;
}
