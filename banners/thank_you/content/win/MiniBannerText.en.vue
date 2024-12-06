<template>
	<div class="wmde-banner-mini-text">
		<p class="wmde-banner-mini-headline">
			<span style="--index: 1">T</span>
			<span style="--index: 2">H</span>
			<span style="--index: 3">A</span>
			<span style="--index: 4">N</span>
			<span style="--index: 5">K&nbsp;</span>
			<span style="--index: 6">Y</span>
			<span style="--index: 7">O</span>
			<span style="--index: 8">U</span>
			<span style="--index: 9">!</span>
		</p>
		<p>
			<strong>Around {{ numberOfDonors }} people</strong> showed their appreciation for Wikipedia by donating in the last few weeks.<br>
			<strong>We thank you all from the bottom of our hearts!</strong>
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}

defineProps<Props>();

</script>
