export interface ThankYouStat {
	number: string;
	text: string;
}

export interface ThankYouContent {
	'mini-thank-you': string;
	'mini-message': string;
	'mini-progress-bar-text': string;
	'mini-button': string;
	close: string;
	'read-more': string;
	'read-less': string;
	'photo-credit': string;
	'photo-license': string;
	'more-info': string;
	'use-of-funds': string;
	'main-message-title': string;
	'main-message-content': string;
	'main-message-name': string;
	'main-message-position': string;
	'knowledge-title': string;
	'knowledge-subtitle': string;
	'knowledge-content': string[];
	'birthday-blurb': string;
	'help-title': string;
	'help-subtitle': string;
	'help-content': string[];
	'help-thank-you': string;
	stats: ThankYouStat[]
	'cta-donate-5': string;
	'cta-donate-other': string;
	'reasons': string[];
}
