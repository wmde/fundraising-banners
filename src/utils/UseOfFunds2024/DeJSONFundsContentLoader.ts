import { FundsContentLoader } from '@src/utils/UseOfFunds2024/FundsContentLoader';
import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';
import * as useOfFundsContent from 'fundraising-frontend-content/i18n/de_DE/data/use_of_funds_2024.json';

export class DeJSONFundsContentLoader implements FundsContentLoader {

	public getContent(): UseOfFundsContent {
		return useOfFundsContent as UseOfFundsContent;
	}
}
