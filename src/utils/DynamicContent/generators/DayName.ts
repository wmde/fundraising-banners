import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';

const specialDayNameMessageKeys: { [ key: string ]: string } = {
	'12/06': 'day-name-st-nicholas-day',
	'12/24': 'day-name-christmas-eve',
	'12/25': 'day-name-christmas-day',
	'12/26': 'day-name-2nd-christmas-day'
};

const dayNameMessageKeys: { [ key: number ]: string } = {
	0: 'day-name-sunday',
	1: 'day-name-monday',
	2: 'day-name-tuesday',
	3: 'day-name-wednesday',
	4: 'day-name-thursday',
	5: 'day-name-friday',
	6: 'day-name-saturday'
};

export class DayName implements TextGenerator {
	private readonly date: Date;
	private readonly translator: Translator;

	constructor( date: Date, translator: Translator ) {
		this.date = date;
		this.translator = translator;
	}

	public get(): string {
		return this.translator.translate( this.getDayNameMessageKey( this.date ) );
	}

	private getDayNameMessageKey( date: Date ): string {
		const specialMessageKey = this.getSpecialDayMessageKey( date );

		if ( specialMessageKey in specialDayNameMessageKeys ) {
			return specialDayNameMessageKeys[ specialMessageKey ];
		}

		return dayNameMessageKeys[ date.getDay() ];
	}

	private getSpecialDayMessageKey( date: Date ): string {
		const month = this.ensureTwoDigitValue( date.getMonth() + 1 );
		const day = this.ensureTwoDigitValue( date.getDate() );

		return `${ month }/${ day }`;
	}

	private ensureTwoDigitValue( value: number ): string {
		return ( '0' + value ).slice( -2 );
	}
}
