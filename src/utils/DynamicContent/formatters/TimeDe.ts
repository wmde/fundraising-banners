import { Time } from '@src/utils/DynamicContent/formatters/Time';

export class TimeDe implements Time {
	public getFormatted( date: Date ): string {
		return date.toLocaleString( 'de-DE', { hour: 'numeric', minute: 'numeric' } );
	}
}
