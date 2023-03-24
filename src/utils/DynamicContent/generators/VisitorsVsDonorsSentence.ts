import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';

export class VisitorsVsDonorsSentence implements TextGenerator {
	private readonly _translator: Translator;
	private readonly _millionImpressionsPerDay: number;
	private readonly _projectedNumberOfDonors: number;

	public constructor( translator: Translator, millionImpressionsPerDay: number, projectedNumberOfDonors: number ) {
		this._translator = translator;
		this._millionImpressionsPerDay = millionImpressionsPerDay;
		this._projectedNumberOfDonors = projectedNumberOfDonors;
	}

	public getText(): string {
		const messageKey = ( this._millionImpressionsPerDay === 0 || this._projectedNumberOfDonors === 0 ) ?
			'visitors-vs-donors-sentence-no-impressions' :
			'visitors-vs-donors-sentence';

		return this._translator.translate( messageKey, {
			millionImpressionsPerDay: this._millionImpressionsPerDay,
			totalNumberOfDonors: this._projectedNumberOfDonors
		} );
	}
}
