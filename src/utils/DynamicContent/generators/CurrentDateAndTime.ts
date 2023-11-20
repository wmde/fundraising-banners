import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Time } from '@src/utils/DynamicContent/formatters/Time';

export class CurrentDateAndTime implements TextGenerator<Date> {
	private readonly _translator: Translator;
	private _ordinalFormatter: Ordinal;
	private _timeFormatter: Time;

	public constructor( translator: Translator, ordinalFormatter: Ordinal, timeFormatter: Time ) {
		this._translator = translator;
		this._ordinalFormatter = ordinalFormatter;
		this._timeFormatter = timeFormatter;
	}

	public getText( date: Date ): string {
		return this._translator.translate( 'date-month-time-' + ( date.getMonth() + 1 ), {
			day: this._ordinalFormatter.getFormatted( date.getDate() ),
			time: this._timeFormatter.getFormatted( date )
		} );
	}
}
