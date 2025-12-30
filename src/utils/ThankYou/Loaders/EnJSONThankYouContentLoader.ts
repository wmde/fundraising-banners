import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';
import * as thankYouContent from 'fundraising-frontend-content/i18n/en_GB/data/thank_you_content.json';

export class EnJSONThankYouContentLoader implements ThankYouContentLoader {
	public getContent(): ThankYouContent {
		return thankYouContent as ThankYouContent;
	}
}
