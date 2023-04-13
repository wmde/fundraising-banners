import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Integer } from '@src/utils/DynamicContent/formatters/Integer';

export interface Formatters {
	currency: Currency;
	ordinal: Ordinal;
	integer: Integer;
}
