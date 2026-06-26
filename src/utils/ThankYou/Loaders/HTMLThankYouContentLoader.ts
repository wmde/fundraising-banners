import type { ThankYouContentLoader } from '@src/utils/ThankYou/Loaders/ThankYouContentLoader';
import type { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

export class HTMLThankYouContentLoader implements ThankYouContentLoader {
	public getContent(): ThankYouContent {
		const element = document.getElementById( 'wmde-thank-you' );

		return JSON.parse( element.dataset.thankYou );
	}
}
