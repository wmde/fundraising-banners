import { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { Locales } from '@src/domain/Locales';

export class JSONFundsContentLoader implements FundsContentLoader {

	private _locale: Locales;

	private constructor( locale: Locales ) {
		this._locale = locale;
	}

	public getContent(): UseOfFundsContent {
		return undefined;
	}
}
