import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';

export interface ThankYouContentFactory {
	getThankYouContentLoader(): ThankYouContentLoader;
}
