import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Translator } from '@src/Translator';

export class CurrentDate implements TextGenerator<Date> {
	private readonly _translator: Translator;
	private _ordinalFormatter: Ordinal;

	public constructor( translator: Translator, ordinalFormatter: Ordinal ) {
		this._translator = translator;
		this._ordinalFormatter = ordinalFormatter;
	}

	public getText( date: Date ): string {
		return this._translator.translate( 'date-month-' + ( date.getMonth() + 1 ), {
			day: this._ordinalFormatter.getFormatted( date.getDate() )
		} );
	}
}
