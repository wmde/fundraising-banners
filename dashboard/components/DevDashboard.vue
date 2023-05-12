<template>
	<div>
		<header class="header">
			<div class="header-left">
				<h1>FUN Forge</h1>
				<a class="header-link header-git" target="_blank" :href="`https://github.com/wmde/fundraising-banners/tree/${branchName}`">
					<IconGit /> {{ branchName }}
				</a>
			</div>
			<div class="header-right">
				<a href="https://meta.wikimedia.org/w/index.php?title=Special:CentralNotice" class="header-link">CN</a>
				<a href="https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners" class="header-link">CN Banners</a>
				<a href="#" class="header-link header-link-refresh" @click="refresh"><IconRefresh /></a>
			</div>
		</header>

		<section class="content">
			<div class="campaigns">
				<div
					v-for="( campaign, index ) in campaignList"
					:key="campaign.name"
					:class="[ 'campaign', { 'current-branch': campaign.name === branchName } ]"
					:style="{ '--index': index }"
				>
					<div class="campaign-icon">
						<DeviceMobile v-if="campaign.icon === 'mobile'"/>
						<DevicePad v-else-if="campaign.icon === 'pad'"/>
						<DeviceDesktop v-else/>
					</div>
					<div class="campaign-content">
						<div class="campaign-title">
							<span :title="campaign.name">{{ campaign.name }}</span>
							<span :data-tooltip="campaign.description" class="link-icon link-icon-large">
							<IconInfo/>
						</span>
							<a
								v-if="!campaign.banners.ctrl.pageName.includes('WPDE')"
								target="_blank"
								:href="`https://meta.wikimedia.org/w/index.php?title=Special:CentralNotice&subaction=noticeDetail&notice=${campaign.name}`"
								class="link-icon link-icon-large"
								data-tooltip="View Central Notice Settings"
							>
								<IconCog />
							</a>
							<a
								:href="`https://shutterbug.wikimedia.de/#/slides/${campaign.tracking}`"
								target="_blank"
								class="link-icon link-icon-large"
								data-tooltip="View in Shutterbug"
							>
								<IconShutterbug />
							</a>
							<a
								href="#"
								class="link-icon link-icon-large"
								data-tooltip="Copy Shutterbug Command"
								@click.prevent="onDoScreenshots(campaign.name, $event)"
							>
								<IconCommand />
							</a>
						</div>
						<div class="campaign-banners">
							<div class="campaign-banner">
								<BannerActions
									:campaign="campaign"
									:banner="campaign.banners.ctrl"
									:compileInfo="compileInfo[campaign.banners.ctrl.pageName]"
									:isWPDE="campaign.banners.ctrl.pageName.includes('WPDE')"
								/>
							</div>
							<div class="campaign-banner" v-if="campaign.banners.var">
								<BannerActions
									:campaign="campaign"
									:banner="campaign.banners.var"
									:compileInfo="compileInfo[campaign.banners.var.pageName]"
									:isWPDE="campaign.banners.var.pageName.includes('WPDE')"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer class="footer">
			<div class="footer-left">Welcome to the Fun Forge, we got fun campaigns!</div>
			<div class="footer-right"><a href="#" class="footer-link">Docs</a></div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import type { Campaign, CampaignConfig } from '../../webpack/campaign_config_types';
import BannerActions from './BannerActions.vue';
import IconShutterbug from './IconShutterbug.vue';
import IconGit from './IconGit.vue';
import IconRefresh from './IconRefresh.vue';
import IconCog from './IconCog.vue';
import IconCommand from './IconCommand.vue';
import { CompileInfo, parseCompileInfo } from '../util';
import { computed, onMounted, ref } from 'vue';
import IconInfo from './IconInfo.vue';
import DeviceDesktop from './DeviceDesktop.vue';
import DeviceMobile from './DeviceMobile.vue';
import DevicePad from './DevicePad.vue';

const props = defineProps<{ campaigns: CampaignConfig, gitBranch: string }>();
let branchName = ref<string>( props.gitBranch );
const compileInfo = ref<Record<string, CompileInfo>>( {} );
const gitFailurePrefix = /^UNKNOWN -/;

const campaignList = computed( (): Campaign[] => Object.values( props.campaigns ) );

onMounted( () => {
	fetch( '/compiled-banners/' )
		.then( async res => {
			if ( !res.ok ) {
				return;
			}
			const fileList = await res.text();
			compileInfo.value = parseCompileInfo( fileList );
		} );
} );

const onDoScreenshots = ( campaignName: string, e: Event ): void => {
	e.preventDefault();
	navigator.clipboard.writeText( `ssh -t funweb3-deploy "queue_screenshots ${ campaignName }"` )
		.then( () => {
			// TODO indicate the copying was successful by making something flash
		} );
};

if ( props.gitBranch.match( gitFailurePrefix ) ) {
	branchName.value = props.gitBranch.replace( gitFailurePrefix, '' );
}

const refresh = ( e: Event ): void => {
	e.preventDefault();
	window.location.reload();
};

</script>
