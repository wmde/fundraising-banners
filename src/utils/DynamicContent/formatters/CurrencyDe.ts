import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import formatter from 'format-number';
import { NumberFormatter } from '@src/utils/DynamicContent/formatters/NumberFormatter';

export class CurrencyDe implements Currency {

	private readonly _amountInputFormatter: NumberFormatter;
	private readonly _customAmountInputFormatter: NumberFormatter;
	private readonly _millionsFormatter: NumberFormatter;
	private readonly _millionsNumericFormatter: NumberFormatter;

	public constructor() {
		this._amountInputFormatter = formatter( { round: 2, suffix: ' €', decimal: ',', integerSeparator: '', padRight: 2 } );
		this._customAmountInputFormatter = formatter( { round: 2, decimal: ',', integerSeparator: '', padRight: 2 } );
		this._millionsFormatter = formatter( { round: 1, decimal: ',', suffix: ' Mio. €', padRight: 1 } );
		this._millionsNumericFormatter = formatter( { round: 1, decimal: ',', padRight: 1 } );

	}

	public euroAmount( amount: number ): string {
		return this._amountInputFormatter( amount ).replace( ',00', '' );
	}

	public customAmountInput( amount: number ): string {
		return this._customAmountInputFormatter( amount );
	}

	public millions( amount: number ): string {
		return this._millionsFormatter( amount / 1_000_000 );
	}

	public millionsNumeric( amount: number ): string {
		return this._millionsNumericFormatter( amount / 1_000_000 );
	}
}
