<template>
	<div class="wmde-b-mini-banner">

		<header class="wmde-c-repel" role="none" data-nowrap>
			<div class="wmde-c-cluster">
				<button class="wmde-b-nav-button" @click.prevent="$emit( 'showFundsModal' )" :title="$translate( 'use-of-funds-link-description' )" :tabindex="tabIndex">
					<InfoIconStraight/> Warum spenden?
				</button>

				<button class="wmde-b-nav-button" @click.prevent="$emit( 'alreadyDonatedClicked' )" :tabindex="tabIndex">
					<TickIcon/> {{ $translate( 'mini-banner-already-donated-button' ) }}
				</button>
			</div>

			<div>
				<button class="wmde-b-nav-button" @click.prevent="$emit( 'close' )" :tabindex="tabIndex">
					<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
					<CloseIconMobile/>
				</button>
			</div>
		</header>

		<div class="wmde-b-mini-banner__content">
			<h2 class="wmde-b-lined-heading">Wikipedia ist unverkäuflich</h2>
			<slot name="banner-slider"/>
			<div class="visually-hidden">
				<slot name="banner-text"/>
			</div>
		</div>

		<footer role="none">
			<div>
				<button class="wmde-b-button" data-theme="secondary" data-fill @click="$emit( 'showFullPageBannerPreselected' )" :tabindex="tabIndex">
					Jetzt 10 &euro; spenden
				</button>
			</div>
			<div>
				<button class="wmde-b-button" data-fill @click="$emit( 'showFullPageBanner' )" :tabindex="tabIndex">
					Anderen Betrag
				</button>
			</div>
		</footer>

	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';
import { computed } from 'vue';

interface Props {
	isVisible: boolean;
}

const props = defineProps<Props>();
defineEmits( [ 'showFullPageBanner', 'showFullPageBannerPreselected', 'close', 'showFundsModal', 'alreadyDonatedClicked' ] );

const tabIndex = computed<number | null>( () => props.isVisible ? null : -1 );

</script>
