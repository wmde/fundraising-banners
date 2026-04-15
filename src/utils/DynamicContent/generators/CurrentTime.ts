import type { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import type { Time } from '@src/utils/DynamicContent/formatters/Time';

export class CurrentTime implements TextGenerator<Date> {
	private _timeFormatter: Time;

	public constructor( timeFormatter: Time ) {
		this._timeFormatter = timeFormatter;
	}

	public getText( date: Date ): string {
		return this._timeFormatter.getFormatted( date );
	}
}
