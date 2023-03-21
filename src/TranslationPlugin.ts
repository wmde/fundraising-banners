import { App } from 'vue';
import { Translator } from '@src/Translator';

export default {
	install( app: App, translator: Translator ): void {
		// inject a globally available $translate() method
		app.config.globalProperties.$translate = ( key: string ): string => translator.translate( key );
	}
};
