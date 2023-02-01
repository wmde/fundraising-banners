import { createApp } from 'vue';

import type { Component, App } from 'vue';

declare var Vue: unknown;

type Data = Record<string, unknown>

interface CustomVue {
	createMwApp( rootComponent: Component, rootProps?: Data): App
}

/**
 * This is a wrapper around createApp, which uses MediaWiki-provided Vue instance if available (i.e. in Production)
 */
export function createVueApp( rootComponent: Component, rootProps?: Data): App {
	if ( typeof Vue !== 'undefined' && Vue !== null && ( typeof Vue === 'object' || typeof Vue === 'function' ) ) {
		return (Vue as CustomVue).createMwApp( rootComponent, rootProps );
	}
	return createApp( rootComponent, rootProps );
}

