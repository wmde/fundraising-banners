export type TranslationMessages = Record<string, string>;

export class Translator {
	private readonly _translations: TranslationMessages;

	public constructor( translations: TranslationMessages ) {
		this._translations = translations;
	}

	public translate( key: string, templateTags: Record<string, string | number> = {} ): string {
		if ( !( key in this._translations ) ) {
			return key;
		}

		let message = this._translations[ key ];
		for ( const templateTag in templateTags ) {
			message = message.replace( `{{${ templateTag }}}`, templateTags[ templateTag ].toString() );
		}
		return message;
	}
}
