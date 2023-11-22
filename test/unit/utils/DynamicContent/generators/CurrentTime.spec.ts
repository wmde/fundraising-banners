import { describe, expect, test } from 'vitest';
import { Translator } from '@src/Translator';
import { CurrentDateAndTime } from '@src/utils/DynamicContent/generators/CurrentDateAndTime';
import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';
import { Time } from '@src/utils/DynamicContent/formatters/Time';

const translator = new Translator( {
	'date-month-time-1': 'Ick {{day}} - {{time}}',
	'date-month-time-2': 'Offle {{day}} - {{time}}',
	'date-month-time-10': 'Spune {{day}} - {{time}}',
	'date-month-time-11': 'Sektober {{day}} - {{time}}'
} );

const staticOrdinal: Ordinal = {
	getFormatted: ( figure: number ) => figure + 'sth'
};

const staticTime: Time = {
	getFormatted: ( date: Date ) => `${date.getHours()} ${date.getMinutes()}`
};

describe( 'CurrentTime', () => {
	test.each( [
		[ 1, 14, 13, 42, 'Ick 14sth - 13 42' ],
		[ 2, 27, 8, 16, 'Offle 27sth - 8 16' ],
		[ 10, 2, 1, 59, 'Spune 2sth - 1 59' ],
		[ 11, 8, 23, 0, 'Sektober 8sth - 23 0' ]
	] )( 'returns the proper month name, date, and time', ( month: number, day: number, hours: number, minutes: number, expected: string ) => {
		const currentDate = new CurrentDateAndTime( translator, staticOrdinal, staticTime );

		expect( currentDate.getText( new Date( 2023, month - 1, day, hours, minutes, 0 ) ) ).toEqual( expected );
	} );
} );
