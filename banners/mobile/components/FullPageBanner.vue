<template>
	<div class="wmde-banner-full">
		<ButtonClose class="wmde-banner-full-close" @click.prevent="$emit( 'close' )"/>
		<div class="wmde-banner-full-info">
			<BannerText v-if="onLargeScreen"/>
			<ProgressBar amount-to-show-on-right="TARGET"/>
		</div>
		<div className="wmde-banner-full-call-to-action">
			Jetzt sind Sie <span className="wmde-banner-full-call-to-action-optional-text">in Deutschland</span> gefragt.
		</div>
		<MultiStepDonation
			:form-controller="formController"
			:forms="forms"
		/>

		<div class="wmde-banner-full-small-print">
			<span>
				<a
					class="application-of-funds-link t-use-of-funds-link"
					href="{`https://spenden.wikimedia.de/use-of-funds?${ props.trackingParams }`}"
					onClick="{ props.toggleFundsModal }"
				>
					Wohin geht meine Spende?
				</a>
			</span>
		</div>

		<BannerFooter />
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import BannerText from '../content/BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { FormController } from '@src/utils/FormController/FormController';
import { Component } from 'vue';

interface Props {
	bannerIsVisible: boolean;
	formController: FormController;
	forms: Component[]
}

defineProps<Props>();

defineEmits( [ 'close' ] );

const onLargeScreen = useDisplaySwitch( 1300 );

</script>

<style lang="scss">
@use 'src/themes/mikings/variables/globals';
@use 'src/themes/mikings/variables/colors';
@use 'src/themes/mikings/variables/breakpoints';

.wmde-banner {
	&-full {
		border: 2px solid colors.$primary;
		background: colors.$white;

		p {
			padding-bottom: 16px;
		}

		&-close {
			position: absolute;
			top: 16px;
			right: 16px;
			height: 25px;
			background: colors.$white;

			&:hover {
				cursor: pointer;
			}

			.close-button {
				text-decoration: underline;
			}
		}

		&-info {
			padding: 16px;
		}

		&-call-to-action {
			position: relative;
			color: colors.$white;
			background: colors.$primary;
			font-weight: bold;
			height: 31px;
			line-height: 31px;
			text-align: center;

			&-optional-text {
				display: none;

				@include breakpoints.tablet-portrait-up {
					display: inline;
				}
			}

			&::after {
				content: '';
				position: absolute;
				bottom: -4px;
				left: 50%;
				margin-left: -4px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 4px 4px 0;
				border-color: colors.$primary transparent transparent transparent;
			}
		}

		.banner-text-title {
			margin-right: 30px;
		}

		&-small-print {
			text-align: center;
			font-size: 12px;
			margin-bottom: 16px;

			a {
				color: colors.$gray;

				&:hover,
				&:focus {
					text-decoration: underline;
				}
			}
		}
	}
}

</style>
