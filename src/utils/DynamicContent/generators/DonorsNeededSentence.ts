import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';
import { Translator } from '@src/Translator';

export class DonorsNeededSentence implements TextGenerator {
	private readonly donorsNeeded: number;
	private readonly translator: Translator;

	public constructor( donorsNeeded: number, translator: Translator ) {
		this.donorsNeeded = donorsNeeded;
		this.translator = translator;
	}

	public getText(): string {
		if ( this.donorsNeeded <= 0 ) {
			return '';
		}

		const donorsNeededRounded = this.donorsNeeded > 100 ? Math.round( this.donorsNeeded / 100 ) * 100 : this.donorsNeeded;

		return this.translator.translate( 'remaining-donors-needed-sentence', {
			donorsNeeded: donorsNeededRounded
		} );
	}
}
