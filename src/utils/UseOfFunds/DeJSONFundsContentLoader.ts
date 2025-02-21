import { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import * as useOfFundsContent from 'fundraising-frontend-content/i18n/de_DE/data/use_of_funds_2024.json';

export class DeJSONFundsContentLoader implements FundsContentLoader {

	public getContent(): UseOfFundsContent {
		return useOfFundsContent as UseOfFundsContent;
	}
}
