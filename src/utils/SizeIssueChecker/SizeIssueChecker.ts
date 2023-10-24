import { Vector2 } from '@src/utils/Vector2';

export interface SizeIssueChecker {
	hasSizeIssues( bannerDimensions: Vector2, skinSpaceAdjustment: Vector2 ): boolean;
}
