import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import type { Formatters } from '@src/utils/DynamicContent/Formatters';
import type { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';

export interface LocaleFactory {
	getCurrencyFormatter(): Currency;
	getFormatters(): Formatters;
	getUseOfFundsLoader(): FundsContentLoader;
}
