import { FundsContentLoader } from '@src/utils/UseOfFunds2024/FundsContentLoader';
import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';

export class HtmlFundsContentLoader implements FundsContentLoader {
	public getContent(): UseOfFundsContent {
		const element = document.getElementById( 'wmde-use-of-funds' );

		return JSON.parse( element.dataset.useOfFunds );
	}
}
