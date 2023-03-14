<template>
	<div class="banner-actions">
		<a class="banner-actions-title"
		data-tooltip="Preview in local environment"
		:href="campaign.previewUrlDev.replace('{{banner}}', bannerPageName)"
		target="_blank"
		title="Preview in local environment">
			{{ bannerPageName }}
		</a>
		<div class="banner-actions-links">
			<a class="banner-actions-icon"
			data-tooltip="Preview in Production"
			:href="campaign.previewUrlDev.replace('{{banner}}', bannerPageName)"
			target="_blank"
			title="Preview in prod environment">
				<IconPreview fill="#141414"/>
			</a>
			<a class="banner-actions-icon"
			data-tooltip="Build Banner"
			href="#"
			title="Build Banner"
			@click="onCompileBanner">
				<IconBuild fill="#141414"/>
				<LoadingSpinner :small="true" :loading="isCompiling"/>
			</a>
			<a class="banner-actions-icon"
			:class="{ 'uncompiled': !isCompiled, 'copied': isCopied }"
			href="#"
			title="Copy Banner Code"
			:data-tooltip="bannerCopyTooltip"
			@click="onCopyBannerToClipBoard">
				<IconCopy fill="#141414" />
				<LoadingSpinner :small="true" :loading="isCopying"/>
			</a>
			<a class="banner-actions-icon"
			target="_blank"
			:href="editLink"
			:title="props.isWPDE ? 'Edit WPDE Banner Settings' : 'Edit Banner Settings on CentralNotice'"
			:data-tooltip="props.isWPDE ? 'Edit WPDE Banner Settings' : 'Edit Banner Settings on CentralNotice'">
				<IconEdit fill="#141414" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import type { Banner, Campaign } from '../../webpack/campaign_config_types';
import IconPreview from './IconPreview.vue';
import IconEdit from './IconEdit.vue';
import IconCopy from './IconCopy.vue';
import IconBuild from './IconBuild.vue';
import { relevantTime } from '../relevant_time';
import { CompileInfo } from '../util';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps<{
	banner: Banner,
	campaign: Campaign,
	isWPDE: boolean,
	compileInfo?: CompileInfo
}>();

const bannerPageName = ref( props.banner.pageName );

const CENTRAL_NOTICE_EDIT_URL = 'https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/{{banner}}';
const WPDE_GITHUB_REPO = 'https://github.com/wmde/wikipedia.de-banners/blob/master/campaigns.yml';

const editLink: string = props.isWPDE ? WPDE_GITHUB_REPO : CENTRAL_NOTICE_EDIT_URL.replace( '{{banner}}', bannerPageName.value );

const isCompiled: Ref<boolean> = computed( () => props.compileInfo !== undefined );
const isCopied: Ref<boolean> = ref( false );

const bannerCopyTooltip: Ref<string> = computed( () => {
	if ( props.compileInfo ) {

		if ( isCopied.value ) {
			return 'Compiled banner copied!';
		}

		const compiledSizeInKb = Math.round( Number( props.compileInfo.size ) / 1024 );
		return `Copy ${ compiledSizeInKb } KB Banner Code, compiled ${ relevantTime( props.compileInfo.date.toString() ) }`;
	}
	return 'Banner not compiled';
} );

const isCompiling: Ref<boolean> = ref( false );
const isCopying: Ref<boolean> = ref( false );

function onCompileBanner( e: Event ): void {
	e.preventDefault();
	isCompiling.value = true;
	fetch( `/compile-banner/${ bannerPageName.value }` ).then( async response => {
		const result = await response.json();
		isCompiling.value = false;
		if ( result.err ) {
			alert( result.err );
		}
		location.reload();
		console.log( `Compiled in ${ result.stats.compileTime }` );
	} );
}

function onCopyBannerToClipBoard( e: Event ): void {
	e.preventDefault();
	if ( !isCompiled.value ) {
		return;
	}
	const bannerFileName = `/compiled-banners/${ bannerPageName.value }.js.wikitext`;
	isCopying.value = true;
	fetch( bannerFileName ).then( async response => {
		isCopying.value = false;
		if ( !response.ok ) {
			if ( response.status === 404 ) {
				alert( `${ bannerPageName.value }.js.wikitext not found, maybe you need to compile first?` );
			} else {
				alert( response.statusText );
			}
			return;
		}
		const bannerCode = await response.text();
		if ( navigator.clipboard ) {
			try {
				await navigator.clipboard.writeText( bannerCode );
				isCopied.value = true;
				return;
			} catch ( error ) {
				console.error( 'Failed to copy banner code using navigator.clipboard:', error );
			}
		}
	} );
}

</script>
