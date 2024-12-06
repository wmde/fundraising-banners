<template>
	<div class="wmde-banner-mini-text">'
		<p>
			<strong>Around {{ numberOfDonors }} people</strong> have donated and shown their appreciation for Wikipedia.<br>
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
