import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import TimeRange from '@src/utils/TimeRange';
import { Translator } from '@src/Translator';

export class DaysPassedSentence implements TextGenerator {
	private readonly _campaignDays: TimeRange;
	private readonly _translator: Translator;

	public constructor( campaignDays: TimeRange, translator: Translator ) {
		this._campaignDays = campaignDays;
		this._translator = translator;
	}

	public getText(): string {
		const daysSinceStart = this._campaignDays.daysSinceStart();
		return [
			daysSinceStart,
			this.getDayTranslation( daysSinceStart )
		].join( ' ' );
	}

	private getDayTranslation( daysSinceStart: number ): string {
		return daysSinceStart === 1 ?
			this._translator.translate( 'day-singular' ) :
			this._translator.translate( 'day-plural' );
	}
}
