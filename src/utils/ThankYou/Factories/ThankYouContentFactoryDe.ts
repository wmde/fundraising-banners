import { ThankYouContentFactory } from '@src/utils/ThankYou/Factories/ThankYouContentFactory';
import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { ThankYouContentDeLoader } from '@environment/ThankYouContentDeLoader';

export class ThankYouContentFactoryDe implements ThankYouContentFactory {
	public getThankYouContentLoader(): ThankYouContentLoader {
		return new ThankYouContentDeLoader();
	}
}
