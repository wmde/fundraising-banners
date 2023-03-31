import { ImpressionCount } from '@src/utils/ImpressionCount';

export class ImpressionCountStub implements ImpressionCount {
	public incrementImpressionCounts(): void {
	}

	public bannerCount: number = 0;
	public overallCount: number = 0;
	public bannerCountIncremented: number = 1;
	public overallCountIncremented: number = 1;

}
