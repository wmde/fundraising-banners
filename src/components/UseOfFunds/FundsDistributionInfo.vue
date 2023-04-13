<template>
	<div class="funds-distribution-info">

		<div class="funds-distribution-info-graph">
			<div
				v-for="( fundsItem, idx ) in applicationOfFundsData"
				:key="idx"
				@mouseenter="setActive( idx )"
				@click="setActive( idx )" :class="[
					'funds-distribution-info-item',
					`funds-distribution-info-item-${fundsItem.id}`,
					{ active : idx === currentActiveItem }
				]"
				:style="{
					width: fundsItem.percentage + '%',
					'flex-basis': fundsItem.percentage + '%'
				}"
			>
				<div class="funds-distribution-info-item-title">{{ fundsItem.title }}</div>
				<div class="funds-distribution-info-item-box">{{ fundsItem.percentage }}%</div>
			</div>
		</div>

		<div v-for="( fundsItem, idx ) in applicationOfFundsData" :key="fundsItem.id" :class="[
			'funds-distribution-info-text',
			{ active : idx === currentActiveItem }
		]">
			{{ fundsItem.text }}
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
