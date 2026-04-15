import type { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

export interface ThankYouContentLoader {
	getContent(): ThankYouContent;
}
