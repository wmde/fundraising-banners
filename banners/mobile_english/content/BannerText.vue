<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				To all our readers in Germany,
			</p>
			<p>
				This {{ currentDayName }} your support is requested by the nonprofit that collects donations on
				Wikipedia to support free knowledge. Each year, thanks to the 1% of readers who give to support our
				nonprofit mission, we can expand the reach of free knowledge to new corners of the world. <span
				class="wmde-banner-text-animated-highlight">If Wikipedia matters and is useful to you too, please join them and donate €5 today.</span>
				Give only what you can comfortably give: what matters is your support, not the size of your gift.
				Together, let's preserve this special space on the internet. Online, Wikipedia is the closest thing we
				have to a public park or a library where everyone can go to learn. And that's priceless. Thank you.
			</p>
			<i>— Wikimedia Fördergesellschaft</i>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { currentDayName }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
