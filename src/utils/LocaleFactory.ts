import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { FundsContentLoader } from '@src/utils/UseOfFunds/FundsContentLoader';

export interface LocaleFactory {
	getCurrencyFormatter(): Currency;
	getFormatters(): Formatters
	getUseOfFundsLoader(): FundsContentLoader;
}
