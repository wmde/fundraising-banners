import type { LocaleFactory } from '@src/utils/LocaleFactory';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import type { Formatters } from '@src/utils/DynamicContent/Formatters';
import type { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';
import { OrdinalDe } from '@src/utils/DynamicContent/formatters/OrdinalDe';
import { IntegerDe } from '@src/utils/DynamicContent/formatters/IntegerDe';
import { UseOfFundsDeLoader } from '@environment/UseOfFundsDeLoader';
import { TimeDe } from '@src/utils/DynamicContent/formatters/TimeDe';

export class LocaleFactoryDe implements LocaleFactory {
	private readonly _currencyFormatter: Currency;

	public constructor() {
		this._currencyFormatter = new CurrencyDe();
	}

	public getCurrencyFormatter(): Currency {
		return this._currencyFormatter;
	}

	public getFormatters(): Formatters {
		return {
			currency: this._currencyFormatter,
			ordinal: new OrdinalDe(),
			integer: new IntegerDe(),
			time: new TimeDe()
		};
	}

	public getUseOfFundsLoader(): FundsContentLoader {
		return new UseOfFundsDeLoader();
	}
}
