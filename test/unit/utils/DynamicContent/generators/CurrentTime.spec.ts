import { describe, expect, test } from 'vitest';
import { Time } from '@src/utils/DynamicContent/formatters/Time';
import { CurrentTime } from '@src/utils/DynamicContent/generators/CurrentTime';

const staticTime: Time = {
	getFormatted: ( date: Date ) => `${date.getHours()} ${date.getMinutes()}`
};

describe( 'CurrentTime', () => {
	test.each( [
		[ 1, 14, 13, 42, '13 42' ],
		[ 2, 27, 8, 16, '8 16' ],
		[ 10, 2, 1, 59, '1 59' ],
		[ 11, 8, 23, 0, '23 0' ]
	] )( 'returns the proper time', ( month: number, day: number, hours: number, minutes: number, expected: string ) => {
		const currentDate = new CurrentTime( staticTime );

		expect( currentDate.getText( new Date( 2023, month - 1, day, hours, minutes, 0 ) ) ).toEqual( expected );
	} );
} );
