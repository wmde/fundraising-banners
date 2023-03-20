import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';

export interface Formatters {
	currency: Currency;
	ordinal: Ordinal;
}
