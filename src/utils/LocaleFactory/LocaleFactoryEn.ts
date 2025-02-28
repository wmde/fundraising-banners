import { LocaleFactory } from '@src/utils/LocaleFactory';
import { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';
import { UseOfFundsEnLoader } from '@environment/UseOfFundsEnLoader';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { OrdinalEn } from '@src/utils/DynamicContent/formatters/OrdinalEn';
import { IntegerEn } from '@src/utils/DynamicContent/formatters/IntegerEn';
import { TimeEn } from '@src/utils/DynamicContent/formatters/TimeEn';

export class LocaleFactoryEn implements LocaleFactory {
	private readonly _currencyFormatter: Currency;

	public constructor() {
		this._currencyFormatter = new CurrencyEn();
	}

	public getCurrencyFormatter(): Currency {
		return this._currencyFormatter;
	}

	public getFormatters(): Formatters {
		return {
			currency: this._currencyFormatter,
			ordinal: new OrdinalEn(),
			integer: new IntegerEn(),
			time: new TimeEn()
		};
	}

	public getUseOfFundsLoader(): FundsContentLoader {
		return new UseOfFundsEnLoader();
	}

}
