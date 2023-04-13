import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';

export interface FundsContentLoader {
	getContent(): UseOfFundsContent;
}
