<template>
	<ul role="tablist" class="wmde-b-slider__pagination" aria-hidden="true">
		<li>
			<button
				@click.prevent="$emit( 'previous' )"
				class="wmde-b-slider__pagination-chevron"
			>
				<span class="visually-hidden">{{ $translate( 'previous-slide' ) }}</span>
				<ChevronLeftIcon/>
			</button>
		</li>
		<li role="presentation" v-for="index in slidesCount" :key="index">
			<button
				role="tab"
				class="wmde-b-slider__pagination-item"
				:class="{ 'wmde-b-slider__pagination-item--active' : currentSlide === index - 1 }"
				@click="$emit( 'goToSlide', index - 1 )"
				:aria-selected="currentSlide === index - 1"
				:aria-controls="`wmde-banner-slide-${ index - 1 }`"
			>
				<span class="visually-hidden">{{ $translate( 'slide-page', { page: index, total: slidesCount } ) }}</span>
			</button>
		</li>
		<li>
			<button
				@click.prevent="$emit( 'next' )"
				class="wmde-b-slider__pagination-chevron"
			>
				<span class="visually-hidden">{{ $translate( 'next-slide' ) }}</span>
				<ChevronRightIcon/>
			</button>
		</li>
	</ul>
</template>

<script setup lang="ts">
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

interface Props {
	currentSlide?: number;
	slidesCount?: number;
}

withDefaults( defineProps<Props>(), {
	slidesCount: 0,
} );

defineEmits( [ 'previous', 'goToSlide', 'next' ] );

</script>
