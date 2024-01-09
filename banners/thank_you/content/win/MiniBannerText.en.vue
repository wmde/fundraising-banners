<template>
	<div class="wmde-banner-mini-text">
		<p>
			<strong>Around {{ numberOfDonors }} people</strong> showed their appreciation for Wikipedia by donating in the last few weeks.<br>
			<strong>We thank you all from the bottom of our hearts!</strong>
		</p>
	</div>
	<slot name="progress"/>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}

defineProps<Props>();

</script>
