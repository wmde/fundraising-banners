<template>
	<table class="company-budgets">
		<tr v-for="company in companies" :class="'company-budgets-row-' + company.name.toLowerCase()" :key="company.name">
			<td class="company-budgets-col-company">{{ company.name }} </td>
			<td class="company-budgets-col-graph">
				<span class="company-budgets-budget-line" :style="{ width: ( company.budget / highestBudget * 100 ) + '%' }">&#xa0;</span>
			</td>
			<td class="company-budgets-col-budget-number">
				<span class="company-budgets-number">{{ company.budgetString }}</span>
				<span class="company-budgets-inline-citation">
					<CompanyCitation :company="company" :citation-label="citationLabel" />
				</span>
			</td>
			<td class="company-budgets-col-citation">
				<CompanyCitation :company="company" :citation-label="citationLabel" />
			</td>
		</tr>
	</table>
</template>

<script setup lang="ts">

import { Company } from '@src/domain/UseOfFunds/Company';
import { computed } from 'vue';
import CompanyCitation from '@src/components/UseOfFunds/CompanyCitation.vue';

interface Props {
	companies: Company[];
	citationLabel: string;
}

const props = defineProps<Props>();

const highestBudget = computed( () => props.companies.reduce( ( budget: number, company: Company ) =>
	Math.max( budget, company.budget ), 0 )
);

</script>
