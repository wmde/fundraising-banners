<template>
	<div class="wmde-b-mini-banner" :class="`wmde-b-mini-banner--slide-${currentSlide}`">
		<BackgroundImage
			:visible="!formIsVisible && currentSlide == 0"
			image="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/VST_images_the_Lagoon_Nebula.jpg/960px-VST_images_the_Lagoon_Nebula.jpg"
			:credit="$translate( 'photo-credit', { name: 'ESO, VST images the Lagoon Nebula, CC BY 4.0' } )"
		/>
		<BackgroundImage
			:visible="!formIsVisible && currentSlide == 1"
			:credit="$translate( 'photo-credit', { name: 'Patricia Costillo, Wikimania 2019 Group Photo 2, CC BY-SA 4.0' } )"
			image="https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Wikimania_2019_Group_Photo_2.jpg/960px-Wikimania_2019_Group_Photo_2.jpg"
		/>
		<BackgroundImage
			:visible="!formIsVisible && currentSlide == 2"
			:credit="$translate( 'photo-credit', { name: 'VGrigas (WMF), Papaul Tshibamba 4, CC BY-SA 3.0' } )"
			image="https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Papaul_Tshibamba-4.jpg/960px-Papaul_Tshibamba-4.jpg"
		/>
		<BackgroundImage
			:visible="!formIsVisible && currentSlide == 3"
			:credit="$translate( 'photo-credit', { name: 'Wikimedia Foundation, Wikipedia mini globe handheld, CC BY-SA 3.0' } )"
			image="https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Wikipedia_mini_globe_handheld.jpg/960px-Wikipedia_mini_globe_handheld.jpg"
		/>
		<BackgroundImage
			:visible="formIsVisible"
			image="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/960px-A_small_cup_of_coffee.JPG"
			:credit="$translate( 'photo-credit', { name: 'Julius Schorzman, A small cup of coffee, CC BY-SA 2.0' } )"
		/>

		<div class="wmde-b-mini-banner__foreground">
			<div class="wmde-b-mini-banner__content wmde-b-stacker" :data-index="formIsVisible ? 1 : 0">

				<div>
					<slot name="banner-slider"/>
					<slot name="banner-text"/>

					<footer role="none" class="wmde-c-flow">
						<div>
							<button class="wmde-b-button" @click.prevent="$emit( 'showFullBanner' )" :tabindex="formIsVisible ? -1 : null">
								Jetzt Wikipedia unterstützen
							</button>
						</div>
						<slot name="slider-pagination"/>
					</footer>
				</div>

				<div class="wmde-b-mini-banner__form-text" ref="formMessage" tabindex="-1">
					<slot name="form-text"/>
				</div>

			</div>

		</div>

	</div>
</template>

<script setup lang="ts">

import BackgroundImage from './BackgroundImageVar.vue';
import { ref } from 'vue';

interface Props {
	currentSlide?: number;
	formIsVisible: boolean;
}

withDefaults( defineProps<Props>(), {
	currentSlide: 0,
} );
defineEmits( [ 'showFullBanner', 'close', 'showFundsModal', 'alreadyDonatedClicked' ] );

const formMessage = ref<any>( null );
const focusFormMessage = (): void => formMessage.value.focus();
defineExpose( { focusFormMessage } );

</script>
