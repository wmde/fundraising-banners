export type TranslationMessages = Record<string, string>;

export class Translator {
	private readonly translations: TranslationMessages;

	constructor( translations: TranslationMessages ) {
		this.translations = translations;
	}

	public translate( key: string ): string {
		return this.translations[ key ] || key;
	}
}
