<template>
	<div class="funds_distribution_info">

		<div class="funds_distribution_info__graph">
			<div
				v-for="( fundsItem, idx ) in applicationOfFundsData"
				:key="idx"
				@mouseenter="setActive( idx )"
				@click="setActive( idx )" :class="[
					'funds_distribution_info_item',
					`funds_distribution_info_item--${fundsItem.id}`,
					{ active : idx === currentActiveItem }
				]"
				:style="{
					width: fundsItem.percentage + '%',
					flexBase: fundsItem.percentage + '%'
				}"
			>
				<div class="funds_distribution_info_item__title">{{ fundsItem.title }}</div>
				<div class="funds_distribution_info_item__box">{{ fundsItem.percentage }}%</div>
			</div>
		</div>

		<div v-for="( fundsItem, idx ) in applicationOfFundsData" :key="fundsItem.id" :class="[
			'funds_distribution_info__text',
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
