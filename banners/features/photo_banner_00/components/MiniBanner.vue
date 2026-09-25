<template>
	<div class="wmde-b-mini-banner" :class="`wmde-b-mini-banner--slide-${currentSlide}`">
		<BackgroundImage :visible="!formIsVisible && currentSlide == 0" image="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/VST_images_the_Lagoon_Nebula.jpg/960px-VST_images_the_Lagoon_Nebula.jpg"/>
		<BackgroundImage :visible="!formIsVisible && currentSlide == 1" image="https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Banana-Sitia-Crete.jpg/960px-Banana-Sitia-Crete.jpg"/>
		<BackgroundImage :visible="!formIsVisible && currentSlide == 2" image="https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Papaul_Tshibamba-4.jpg/960px-Papaul_Tshibamba-4.jpg"/>
		<BackgroundImage :visible="!formIsVisible && currentSlide == 3" image="https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Wikipedia_mini_globe_handheld.jpg/960px-Wikipedia_mini_globe_handheld.jpg"/>
		<BackgroundImage :visible="formIsVisible" image="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/960px-A_small_cup_of_coffee.JPG"/>

		<div class="wmde-b-mini-banner__foreground">
			<div class="wmde-b-mini-banner__content wmde-b-stacker" :data-index="formIsVisible ? 1 : 0">

				<div>
					<slot name="banner-slider"/>
					<slot name="banner-text"/>

					<footer role="none" class="wmde-c-flow">
						<div>
							<button class="wmde-b-button" @click.prevent="$emit( 'showFullBanner' )">
								Jetzt Wikipedia unterstützten
							</button>
						</div>
						<slot name="slider-pagination"/>
					</footer>
				</div>

				<div class="wmde-b-mini-banner__form-text">
					<slot name="form-text"/>
				</div>

			</div>

		</div>

	</div>
</template>

<script setup lang="ts">

import BackgroundImage from './BackgroundImage.vue';

interface Props {
	currentSlide?: number;
	formIsVisible: boolean;
}

withDefaults( defineProps<Props>(), {
	currentSlide: 0,
} );
defineEmits( [ 'showFullBanner', 'close', 'showFundsModal', 'alreadyDonatedClicked' ] );

</script>
