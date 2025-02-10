<template>
	<h2>
		<span style="--index: 1;">D</span>
		<span style="--index: 2;">a</span>
		<span style="--index: 3;">n</span>
		<span style="--index: 4;">k</span>
		<span style="--index: 5;">e</span>
		<span style="--index: 6;">!</span>
	</h2>
	<p>Rund {{ numberOfDonors }} Menschen haben in den letzten Wochen gespendet und Wikipedia ihre Wertschätzung erwiesen. Ihnen allen danken wir von ganzem Herzen!</p>
</template>

<script setup lang="ts">
interface Props {
	numberOfDonors: string;
}
defineProps<Props>();
</script>
