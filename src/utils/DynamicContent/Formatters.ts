import type { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import type { Integer } from '@src/utils/DynamicContent/formatters/Integer';
import type { Time } from '@src/utils/DynamicContent/formatters/Time';

export interface Formatters {
	currency: Currency;
	ordinal: Ordinal;
	integer: Integer;
	time: Time;
}
