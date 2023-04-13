<template>
	<div class="funds-distribution-accordion">
		<div v-for="( fundsItem, idx ) in applicationOfFundsData" :key="idx" :class="[
			'funds-distribution-accordion-item',
			'funds-distribution-accordion-item-' + fundsItem.id,
			{ 'active' : currentActiveItems.includes( idx ) }
		]">
			<button class="funds-distribution-accordion-item-title" @click="toggleActive( idx )">
				{{ fundsItem.title }} {{ fundsItem.percentage }}% <ChevronDownIcon class="funds-distribution-accordion-item-chevron"/>
			</button>
			<div class="funds-distribution-accordion-item-text">
				{{ fundsItem.text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ApplicationOfFundsItem } from '@src/domain/UseOfFunds/ApplicationOfFundsItem';
import { ref } from 'vue';
import ChevronDownIcon from '@src/components/Icons/ChevronDownIcon.vue';

interface Props {
	applicationOfFundsData: ApplicationOfFundsItem[]
}

defineProps<Props>();

const currentActiveItems = ref<number[]>( [] );

const toggleActive = ( idx: number ): void => {
	if ( currentActiveItems.value.includes( idx ) ) {
		currentActiveItems.value.splice( currentActiveItems.value.indexOf( idx ), 1 );
	} else {
		currentActiveItems.value.push( idx );
	}
};

</script>
