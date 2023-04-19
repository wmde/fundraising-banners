<template>
	<div class="wmde-banner-full">
		<div class="wmde-banner-full-content">
			<button class="wmde-banner-full-close" @click.prevent="$emit( 'close' )">
				<CloseIconMobile/>
			</button>
			<div class="wmde-banner-full-info">
				<BannerText/>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
			<div class="wmde-banner-full-call-to-action">
				Jetzt sind Sie <span class="wmde-banner-full-call-to-action-optional-text">in Deutschland</span> gefragt.
			</div>

			<MultiStepDonation
				:form-controller="formController"
				:forms="forms"
			/>

			<div class="wmde-banner-full-small-print">
				<span>
					<a
						id="application-of-funds-link"
						class="wmde-banner-footer-usage-link t-use-of-funds-link"
						@click="$emit( 'showFundsModal' )"
					>
						{{ $translate( 'use-of-funds-link' ) }}
					</a>
				</span>
			</div>

			<BannerFooter />
		</div>
	</div>
</template>

<script setup lang="ts">

import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import BannerText from '../content/BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { FormController } from '@src/utils/FormController/FormController';
import { Component } from 'vue';

interface Props {
	formController: FormController;
	forms: Component[]
}

defineProps<Props>();

defineEmits( [ 'close', 'showFundsModal' ] );

</script>

<style lang="scss">
@use 'src/themes/mikings/variables/globals';
@use 'src/themes/mikings/variables/colors';
@use 'src/themes/mikings/variables/breakpoints';

.wmde-banner {
	&-full {
		position: fixed;
		top: 0;
		z-index: 1000;
		height: 100%;
		width: 100%;
		overflow-y: auto;
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
