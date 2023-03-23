import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Translator } from '@src/Translator';

export class CurrentDate implements TextGenerator {
	private _date: Date;
	private readonly _translator: Translator;
	private _ordinalFormatter: Ordinal;

	public constructor( date: Date, translator: Translator, ordinalFormatter: Ordinal ) {
		this._date = date;
		this._translator = translator;
		this._ordinalFormatter = ordinalFormatter;
	}

	public getText(): string {
		return this._translator.translate( 'month-name-' + ( this._date.getMonth() + 1 ) ) + ' ' + this._ordinalFormatter.getFormatted( this._date.getDate() );
	}
}
