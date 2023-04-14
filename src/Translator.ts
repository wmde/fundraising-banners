export type TranslationMessages = Record<string, string>;

export class Translator {
	private readonly _messages: TranslationMessages;

	public constructor( messages: TranslationMessages ) {
		this._messages = messages;
	}

	public translate( key: string, templateTags: Record<string, string | number> = {} ): string {
		if ( !( key in this._messages ) ) {
			return key;
		}

		let message = this._messages[ key ];
		for ( const templateTag in templateTags ) {
			message = message.replace( `{{${ templateTag }}}`, templateTags[ templateTag ].toString() );
		}
		return message;
	}
}
