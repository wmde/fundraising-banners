import { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

export class HTMLThankYouContentLoader implements ThankYouContentLoader {
	public getContent(): ThankYouContent {
		const element = document.getElementById( 'wmde-thank-you' );

		return JSON.parse( element.dataset.thankYou );
	}
}
