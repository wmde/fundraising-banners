import type { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import type { Translator } from '@src/Translator';
import type { Integer } from '@src/utils/DynamicContent/formatters/Integer';

export class VisitorsVsDonorsSentence implements TextGenerator {
	private readonly _translator: Translator;
	private readonly _millionImpressionsPerDay: number;
	private readonly _projectedNumberOfDonors: number;
	private readonly _integerFormatter: Integer;
	private readonly _lastYearNumberOfDonors: number | undefined;

	public constructor(
		translator: Translator,
		millionImpressionsPerDay: number,
		projectedNumberOfDonors: number,
		integerFormatter: Integer,
		lastYearNumberOfDonors?: number
	) {
		this._translator = translator;
		this._millionImpressionsPerDay = millionImpressionsPerDay;
		this._projectedNumberOfDonors = projectedNumberOfDonors;
		this._integerFormatter = integerFormatter;
		this._lastYearNumberOfDonors = lastYearNumberOfDonors;
	}

	public getText(): string {
		let messageKey = 'visitors-vs-donors-sentence-no-impressions';
		let fewerDonorsThanLastYear = 0;
		if ( this._millionImpressionsPerDay !== 0 && this._projectedNumberOfDonors !== 0 ) {
			messageKey = 'visitors-vs-donors-sentence';
			if ( this._lastYearNumberOfDonors && this._projectedNumberOfDonors < this._lastYearNumberOfDonors ) {
				messageKey = 'visitors-vs-donors-sentence-last-year';
				fewerDonorsThanLastYear = this._lastYearNumberOfDonors - this._projectedNumberOfDonors;
			}
		}

		return this._translator.translate( messageKey, {
			millionImpressionsPerDay: this._millionImpressionsPerDay,
			totalNumberOfDonors: this._integerFormatter.format( this._projectedNumberOfDonors ),
			fewerDonorsThanLastYear: this._integerFormatter.format( fewerDonorsThanLastYear ),
		} );
	}
}
