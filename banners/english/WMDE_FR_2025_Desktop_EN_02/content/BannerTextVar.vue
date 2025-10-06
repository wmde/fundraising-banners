<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				We may be coming at an inopportune moment, but please don't click away! This
				{{ liveDateAndTime.currentDate }}, we're asking you to support Wikipedia's independence.
				<AnimatedText content="Millions of people use Wikipedia, but 99% don't donate—they simply look the
				other way."/> Most people donate because they find Wikipedia useful. The average donation is €22.89,
				but even €5 helps us. Has Wikipedia given you the value of a cup of coffee this year? Then choose to be
				one of the rare exceptions and give something back. Thank you!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const { getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
