import type { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';
import type { UseOfFundsContent } from '@src/domain/EditableContent/UseOfFundsContent';

export class HtmlFundsContentLoader implements FundsContentLoader {
	public getContent(): UseOfFundsContent {
		const element = document.getElementById( 'wmde-use-of-funds' );

		return JSON.parse( element.dataset.useOfFunds );
	}
}
