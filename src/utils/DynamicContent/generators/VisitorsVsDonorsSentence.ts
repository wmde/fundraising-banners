import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';

export class VisitorsVsDonorsSentence implements TextGenerator {
	private readonly translator: Translator;
	private readonly millionImpressionsPerDay: number;
	private readonly projectedNumberOfDonors: number;

	public constructor( translator: Translator, millionImpressionsPerDay: number, projectedNumberOfDonors: number ) {
		this.translator = translator;
		this.millionImpressionsPerDay = millionImpressionsPerDay;
		this.projectedNumberOfDonors = projectedNumberOfDonors;
	}

	public getText(): string {
		const messageKey = ( this.millionImpressionsPerDay === 0 || this.projectedNumberOfDonors === 0 ) ?
			'visitors-vs-donors-sentence-no-impressions' :
			'visitors-vs-donors-sentence';

		return this.translator.translate( messageKey, {
			millionImpressionsPerDay: this.millionImpressionsPerDay,
			totalNumberOfDonors: this.projectedNumberOfDonors
		} );
	}
}
