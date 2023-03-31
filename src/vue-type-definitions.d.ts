export {};

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$translate: ( key: string, templateTags: Record<string, string | number> = {} ) => string;
	}
}
