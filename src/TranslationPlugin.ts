import { App } from 'vue';

export type TranslationMessages = Record<string, string>;

export default {
	install( app: App, options: TranslationMessages ) {
		// inject a globally available $translate() method
		app.config.globalProperties.$translate = ( key: string ): string => {
			return options[ key ] || key;
		};
	}
};
