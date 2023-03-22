import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Translator } from '@src/Translator';

export class CurrentDate implements TextGenerator {
	private date: Date;
	private readonly translator: Translator;
	private ordinalFormatter: Ordinal;

	public constructor( date: Date, translator: Translator, ordinalFormatter: Ordinal ) {
		this.date = date;
		this.translator = translator;
		this.ordinalFormatter = ordinalFormatter;
	}

	public getText(): string {
		return this.translator.translate( 'month-name-' + ( this.date.getMonth() + 1 ) ) + ' ' + this.ordinalFormatter.getFormatted( this.date.getDate() );
	}
}
