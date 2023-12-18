<template>
	<div class="wmde-banner-mini-text">
		<p>
			<strong>{{ numberOfDonors }} tolle Menschen</strong> haben in den letzten Wochen gespendet und Wikipedia ihre Wertschätzung erwiesen.<br>
			<strong>Ihnen allen danken wir von ganzem Herzen!</strong>
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}

defineProps<Props>();

</script>
