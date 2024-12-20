import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { FundsContentLoader } from '@src/utils/UseOfFunds2024/FundsContentLoader';

export interface LocaleFactory {
	getCurrencyFormatter(): Currency;
	getFormatters(): Formatters;
	getUseOfFundsLoader(): FundsContentLoader;
}
