<template>
	<div class="funds_distribution_accordion">
		<div v-for="( fundsItem, idx ) in applicationOfFundsData" :key="idx" :class="[
			'funds_distribution_info_item',
			'funds_distribution_info_item--' + fundsItem.id,
			{ 'active' : currentActiveItem === idx }
		]">
			<div class="funds_distribution_info_item__title" @click="setActive( idx )">
				{{ fundsItem.title }} {{ fundsItem.percentage }}%
			</div>
			<div class="funds_distribution_info_item__text">
				{{ fundsItem.text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ApplicationOfFundsItem } from '@src/domain/UseOfFunds/ApplicationOfFundsItem';
import { ref } from 'vue';

interface Props {
	applicationOfFundsData: ApplicationOfFundsItem[]
}

defineProps<Props>();

const currentActiveItem = ref<number>( 0 );

const setActive = ( idx: number ): void => {
	currentActiveItem.value = idx;
};

</script>
