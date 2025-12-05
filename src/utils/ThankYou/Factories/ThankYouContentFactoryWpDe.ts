import { ThankYouContentFactory } from '@src/utils/ThankYou/Factories/ThankYouContentFactory';
import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { HTMLThankYouContentLoader } from '@src/utils/ThankYou/Loaders/HTMLThankYouContentLoader';

export class ThankYouContentFactoryWpDe implements ThankYouContentFactory {
	public getThankYouContentLoader(): ThankYouContentLoader {
		return new HTMLThankYouContentLoader();
	}
}
