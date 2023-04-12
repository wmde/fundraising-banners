import { Currency, CurrencyFormatter } from '@src/utils/DynamicContent/formatters/Currency';
import formatter from 'format-number';

export class CurrencyEn implements Currency {
	private readonly _amountInputFormatter: CurrencyFormatter;
	private readonly _customAmountInputFormatter: CurrencyFormatter;
	private readonly _millionsFormatter: ( amount: number ) => string;
	private readonly _millionsNumericFormatter: ( amount: number ) => string;

	public constructor() {
		this._amountInputFormatter = formatter( { round: 2, prefix: '€', integerSeparator: '' } );
		this._customAmountInputFormatter = formatter( { round: 2, integerSeparator: '', padRight: 2 } );
		this._millionsFormatter = formatter( { round: 1, decimal: '.', suffix: 'M', prefix: '€', padRight: 1 } );
		this._millionsNumericFormatter = formatter( { round: 1, decimal: '.', padRight: 1 } );
	}

	public euroAmount( amount: number ): string {
		return this._amountInputFormatter( amount );
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
