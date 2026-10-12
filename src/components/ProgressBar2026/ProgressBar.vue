<template>
	<div class="wmde-b-progress" :class="{ 'wmde-b-progress--visible' : isVisible }" :style="{ '--progress-percentage': progressPercentage + '%' }">
		<div class="wmde-b-progress__text wmde-c-repel" v-if="$slots['left-text'] || $slots['right-text']" aria-hidden="true">
			<div>
				<slot name="left-text"/>
			</div>
			<div>
				<slot name="right-text"/>
			</div>
		</div>

		<div class="wmde-b-progress__bar" aria-hidden="true">
			<div class="wmde-b-progress__track">
				<span>
					<slot name="target-text"/>
				</span>
			</div>
			<div class="wmde-b-progress__fill">
				<span>
					<slot name="fill-text"/>
				</span>
			</div>
		</div>

		<p class="visually-hidden" v-if="$slots['screen-reader-text']">
			<slot name="screen-reader-text"/>
		</p>
	</div>
</template>

<script setup lang="ts">

interface Props {
	isVisible: boolean;
	progressPercentage: number;
}

defineProps<Props>();
</script>
