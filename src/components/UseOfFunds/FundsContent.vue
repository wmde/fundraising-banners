<template>
	<div class="use-of-funds">
		<div class="use-of-funds-section">
			<div class="use-of-funds-section-intro">
				<h2>{{ content.intro.headline }}<span v-if="content.provisional !== ''">*</span></h2>
				<div>{{ content.intro.text }}</div>
			</div>
		</div>

		<FundsDistributionAccordion :application-of-funds-data="content.applicationOfFundsData" />

		<div class="use-of-funds-section">
			<p class="use-of-funds-info-text" v-html="content.detailedReports.mixed.text"></p>
		</div>
		<div class="use-of-funds-section use-of-funds-section-two-cols">
			<div class="use-of-funds-column">
				<div class="use-of-funds-benefits-list">
					<h2>{{ content.benefitsList.headline }}</h2>
					<ul class="use-of-funds-icon-list">
						<li
							v-for="benefit in content.benefitsList.benefits"
							:class="'use-of-funds-icon-list-item-' + benefit.icon"
							:key=benefit.text
						>
							{{ benefit.text }}
						</li>
					</ul>
				</div>
			</div>
			<div class="use-of-funds-column">
				<div class="use-of-funds-comparison">
					<h2>{{ content.comparison.headline }}</h2>
					<div>
						<p v-for="text in content.comparison.paragraphs" :key="text">{{ text }}</p>
						<h3>{{ content.comparison.subhead }}</h3>
					</div>
					<CompanyBudgets
						:companies="content.comparison.companies"
						:citation-label="content.comparison.citationLabel"
					/>
				</div>
			</div>
		</div>
		<div class="use-of-funds-section use-of-funds-section-orgchart">
			<div class="use-of-funds-orgchart-text">
				<h2>{{ content.orgchart.headline }}</h2>
				<div>
					<p v-for="( paragraph, idx ) in orgChartParagraphs" :key="idx" v-html="paragraph"></p>
				</div>
			</div>
			<div class="use-of-funds-orgchart-image">
				<img :src="content.orgchart.imageUrl"  :alt="content.orgchart.headline"/>
			</div>
		</div>
		<div class="banner_model-section use-of-funds-section-call-to-action">
			<button class="use-of-funds-button" @click="$emit( 'hideFundsModal' )">{{ content.callToAction }}</button>
		</div>
		<div v-if="content.provisional !== ''" class="use-of-funds-provisional">{{ content.provisional }}</div>
	</div>
</template>

<script setup lang="ts">

import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import FundsDistributionAccordion from '@src/components/UseOfFunds/FundsDistributionAccordion.vue';
import CompanyBudgets from '@src/components/UseOfFunds/CompanyBudgets.vue';
import { ref } from 'vue';

interface Props {
	content: UseOfFundsContent;
}

const props = defineProps<Props>();
defineEmits( [ 'hideFundsModal' ] );

const orgChartParagraphs = ref<string[]>( props.content.orgchart.paragraphs );

const organizationClassLookup = new Map<string, string>( Object.entries( props.content.orgchart.organizationClasses ) );
organizationClassLookup.forEach( ( cssClass: string, key: string ) => {
	orgChartParagraphs.value[ 0 ] = orgChartParagraphs.value[ 0 ]
		.replace( key, ` <span class="use-of-funds-org use-of-funds-org-${ cssClass }">${ key }</span> ` );
} );

</script>
