import { App } from 'vue';

export type Translations = Record<string, string>;

export default {
	install( app: App, options: Record<string, string> ) {
		// inject a globally available $translate() method
		app.config.globalProperties.$translate = ( key: string ): string => {
			return options[ key ] || key;
		};
	}
};
