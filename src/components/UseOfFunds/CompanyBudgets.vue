<template>
	<table class="company_budgets">
		<tr v-for="company in companies" :class="'company_budgets__row--' + company.name.toLowerCase()" :key="company.name">
			<td class="company_budgets__col--company">{{ company.name }} </td>
			<td class="company_budgets__col--graph">
						<span class="company_budgets__budget_line"
								:style="{ width: ( company.budget / highestBudget * 100 ) + '%' }">&#xa0;</span>
			</td>
			<td class="company_budgets__col--budget_number has-text-right">
				<span class="company_budgets__number">{{ company.budgetString }}</span>
				<span class="company_budgets__inline-citation">
					<CompanyCitation :company="company" :citation-label="citationLabel" />
				</span>
			</td>
			<td class="company_budgets__col--citation has-text-right">
				<CompanyCitation :company="company" :citation-label="citationLabel" />
			</td>
		</tr>
	</table>
</template>

<script setup lang="ts">

import { Company } from '@src/domain/UseOfFunds/Company';
import { computed } from 'vue';

interface Props {
	companies: Company[];
	citationLabel: string;
}

const props = defineProps<Props>();

const highestBudget = computed( () => props.companies.reduce( ( budget: number, company: Company ) =>
	Math.max( budget, company.budget ), 0 )
);

</script>
