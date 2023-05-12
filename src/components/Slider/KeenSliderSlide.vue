<template>
	<div class="keen-slider__slide wmde-banner-slide">
		<div
			class="keen-slider__slide-content wmde-banner-slide-content"
			:class="{ 'wmde-banner-slide--current': isCurrent }"
		>
			<div>
				<slot/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

interface Props {
	isCurrent: boolean;
}

defineProps<Props>();

</script>
