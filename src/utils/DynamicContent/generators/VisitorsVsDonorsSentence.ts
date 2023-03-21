import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';

export class VisitorsVsDonorsSentence implements TextGenerator {
	private readonly translator: Translator;
	private readonly millionImpressionsPerDay: number;
	private projectedNumberOfDonors: number;

	constructor( translator: Translator, millionImpressionsPerDay: number, projectedNumberOfDonors: number ) {
		this.translator = translator;
		this.millionImpressionsPerDay = millionImpressionsPerDay;
		this.projectedNumberOfDonors = projectedNumberOfDonors;
	}

	get(): string {
		const messageKey = this.millionImpressionsPerDay === 0 ?
			'visitors-vs-donors-sentence-no-impressions' :
			'visitors-vs-donors-sentence';

		return this.translator.translate( messageKey )
			.replace( '{{millionImpressionsPerDay}}', this.millionImpressionsPerDay.toString() )
			.replace( '{{totalNumberOfDonors}}', this.projectedNumberOfDonors.toString() );
	}
}
