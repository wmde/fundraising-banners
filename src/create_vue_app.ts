import { createApp } from 'vue';

import type { Component, Data } from 'vue';

declare var Vue: unknown;

/**
 * This is a wrapper around createApp, which uses MediaWiki-provided Vue instance if available (i.e. in Production)
 */
export function createVueApp( rootComponent: Component, rootProps?: Data ) {
	if ( typeof Vue !== 'undefined' && Vue !== null && ( typeof Vue === 'object' || typeof Vue === 'function' ) && Vue.hasOwnProperty( 'createMwApp' ) ) {
		return Vue.createMwApp( rootComponent, rootProps );
	}
	return createApp( rootComponent, rootProps );
}

