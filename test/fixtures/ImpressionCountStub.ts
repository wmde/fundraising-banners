import { ImpressionCount } from '@src/utils/ImpressionCount';

export class ImpressionCountStub implements ImpressionCount {
	public getBannerCount(): number {
		return 0;
	}

	public getOverallCount(): number {
		return 0;
	}

	public incrementImpressionCounts(): void {
	}

}
