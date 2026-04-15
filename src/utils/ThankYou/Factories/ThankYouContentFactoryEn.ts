import type { ThankYouContentFactory } from '@src/utils/ThankYou/Factories/ThankYouContentFactory';
import type { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { ThankYouContentEnLoader } from '@environment/ThankYouContentEnLoader';

export class ThankYouContentFactoryEn implements ThankYouContentFactory {
	public getThankYouContentLoader(): ThankYouContentLoader {
		return new ThankYouContentEnLoader();
	}
}
