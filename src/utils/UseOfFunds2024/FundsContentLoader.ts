import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';

export interface FundsContentLoader {
	getContent(): UseOfFundsContent;
}
