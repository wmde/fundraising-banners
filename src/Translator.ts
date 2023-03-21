export type TranslationMessages = Record<string, string>;

export class Translator {
	private readonly translations: TranslationMessages;

	constructor( translations: TranslationMessages ) {
		this.translations = translations;
	}

	public translate( key: string, templateTags: Record<string, string | number> = {} ): string {
		let message = this.translations[ key ] || key;
		for ( const templateTag in templateTags ) {
			message = message.replace( `{{${ templateTag }}}`, templateTags[ templateTag ].toString() );
		}
		return message;
	}
}
