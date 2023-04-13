import { App } from 'vue';
import { Translator } from '@src/Translator';

export default {
	install( app: App, translator: Translator ): void {
		// inject a globally available $translate() method
		app.config.globalProperties.$translate =
			( key: string, templateTags: Record<string, string | number> = {} ): string =>
				translator.translate( key, templateTags );
		app.provide( 'translator', translator );
	}
};
