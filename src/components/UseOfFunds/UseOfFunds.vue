<template>
	<div class="use-of-funds">
		<h2 class="use-of-funds-heading" id="use-of-funds-heading">{{ content.title }}</h2>
		<p class="use-of-funds-summary-text">{{ content.summary }}</p>

		<div class="use-of-funds-usage">
			<div class="use-of-funds-usage-accordion">
				<details v-for="( accordionItem, index ) in content.accordion.items" :key="index">
					<summary tabindex="0">
						{{ accordionItem.title }}
						<ChevronDown/>
					</summary>
					<div v-html="accordionItem.content"/>
				</details>
			</div>
			<p class="use-of-funds-summary-text" v-html="content.accordion.summary"/>
		</div>

		<CallToAction :text="content.callToAction" @hide="$emit( 'callToAction' )"/>

		<div class="use-of-funds-benefits">
			<h2>{{ content.benefits.title }}</h2>

			<ul>
				<li v-for="( benefitItem, index ) in content.benefits.items" :key="index">
					<BenefitsIcon :icon="benefitItem.icon"/>
					<span>{{ benefitItem.content }}</span>
				</li>
			</ul>
		</div>

		<div class="use-of-funds-revenue-comparison">
			<div class="use-of-funds-revenue-comparison-content">
				<h2>{{ content.revenueComparison.title }}</h2>
				<p v-for="( paragraph, index ) in content.revenueComparison.content" :key="index">
					{{ paragraph }}
				</p>
			</div>

			<div class="use-of-funds-revenue-comparison-companies">
				<h3>{{ content.revenueComparison.companies.title }}</h3>
				<ul>
					<li v-for="company in content.revenueComparison.companies.items" :key="company.name">
						<span class="use-of-funds-companies-company">{{ company.name }}</span>
						<span class="use-of-funds-companies-graph">
							<span class="use-of-funds-companies-budget-line" :style="{ width: ( company.budget / highestBudget * 100 ) + '%' }">&#xa0;</span>
						</span>
						<span class="use-of-funds-companies-number">
							{{ company.budgetString }}
						</span>
						<span class="use-of-funds-companies-link">
							<a v-if="company.link !== ''" :href="company.link" target="_blank">
								{{ company.linkText }}
							</a>
							<span v-else>&nbsp;</span>
						</span>
					</li>
				</ul>
			</div>
		</div>

		<CallToAction :text="content.callToAction" @hide="$emit( 'callToAction' )"/>

		<p v-html="content.closingParagraph"/>
	</div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import BenefitsIcon from '@src/components/UseOfFunds/BenefitsIcon.vue';
import CallToAction from '@src/components/UseOfFunds/CallToAction.vue';
import ChevronDown from '@src/components/UseOfFunds/Icons/ChevronDown.vue';
import { RevenueComparisonItem, UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';

interface Props {
	content: UseOfFundsContent
}

const props = defineProps<Props>();
defineEmits( [ 'callToAction' ] );

const highestBudget = computed( () => props.content.revenueComparison.companies.items.reduce( ( budget: number, company: RevenueComparisonItem ) =>
	Math.max( budget, company.budget ), 0 )
);

</script>
