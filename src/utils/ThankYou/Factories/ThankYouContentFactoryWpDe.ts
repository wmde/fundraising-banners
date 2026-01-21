import { ThankYouContentFactory } from '@src/utils/ThankYou/Factories/ThankYouContentFactory';
import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { DeJSONThankYouContentLoader } from '@src/utils/ThankYou/Loaders/DeJSONThankYouContentLoader';

export class ThankYouContentFactoryWpDe implements ThankYouContentFactory {
	public getThankYouContentLoader(): ThankYouContentLoader {
		return new DeJSONThankYouContentLoader();
	}
}
