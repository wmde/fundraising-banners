<template>
	<h2>
		<span style="--index: 1;">T</span>
		<span style="--index: 2;">h</span>
		<span style="--index: 3;">a</span>
		<span style="--index: 4;">n</span>
		<span style="--index: 5;">k</span>
		<span style="--index: 6;">s</span>
		<span style="--index: 7;">!</span>
	</h2>
	<p>Around {{ numberOfDonors }} people showed their appreciation for Wikipedia by donating in the last few weeks. We thank you all from the bottom of our hearts!</p>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}
defineProps<Props>();
</script>
