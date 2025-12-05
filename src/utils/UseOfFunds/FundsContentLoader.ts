import { UseOfFundsContent } from '@src/domain/EditableContent/UseOfFundsContent';

export interface FundsContentLoader {
	getContent(): UseOfFundsContent;
}
