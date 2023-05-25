import { Page } from '@src/page/Page';
import { BannerConfig } from '@src/domain/BannerConfig';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { ImpressionCount } from '@src/utils/ImpressionCount';

export interface BannerConductorProps {
	page: Page;
	bannerConfig: BannerConfig;
	resizeHandler: ResizeHandler;
	impressionCount: ImpressionCount;
}
