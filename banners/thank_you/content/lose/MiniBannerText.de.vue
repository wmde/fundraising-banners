<template>
	<div class="wmde-banner-mini-text">
		<p>
			<strong>{{ numberOfDonors }} Menschen</strong> haben gespendet und Wikipedia ihre Wertschätzung erwiesen.<br>
			<strong>Ihnen danken wir von ganzem Herzen!</strong>
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}

defineProps<Props>();

</script>
