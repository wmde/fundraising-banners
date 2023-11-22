import { Time } from '@src/utils/DynamicContent/formatters/Time';

export class TimeEn implements Time {
	public getFormatted( date: Date ): string {
		return date.toLocaleString( 'en-GB', { hour: 'numeric', hour12: true, minute: 'numeric' } );
	}
}
