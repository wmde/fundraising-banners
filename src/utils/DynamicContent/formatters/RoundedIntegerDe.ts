import { Integer } from '@src/utils/DynamicContent/formatters/Integer';
import { NumberFormatter } from '@src/utils/DynamicContent/formatters/NumberFormatter';
import formatter from 'format-number';

export class RoundedIntegerDe implements Integer {

	private readonly _integerFormatter: NumberFormatter;

	public constructor() {
		this._integerFormatter = formatter( { round: 0, integerSeparator: '.' } );
	}

	public format( amount: number ): string {
		return this._integerFormatter( Math.round( amount / 1000 ) * 1000 );
	}
}
