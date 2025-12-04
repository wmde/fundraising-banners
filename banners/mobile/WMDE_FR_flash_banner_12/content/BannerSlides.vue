<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0">
		<p><strong>Warum Wikipedia wichtig ist</strong></p>
		<p>Wikipedia ist eines der meistbesuchten Websites der Welt und komplett werbefrei. <AnimatedText :is-visible="currentSlide === 0">Deine ehrliche Einschätzung hilft uns, dir die passende Spendenhöhe vorzuschlagen.</AnimatedText> Deine ehrliche Einschätzung hilft uns lorem ipusm dol</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, autem natus optio quo quod repudiandae? Consequatur consequuntur cumque ex omnis, provident ullam vitae. Adipisci et hic maiores voluptate. Deserunt, voluptatibus?</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, autem natus optio quo quod repudiandae? Consequatur consequuntur cumque ex omnis, provident ullam vitae. Adipisci et hic maiores voluptate. Deserunt, voluptatibus?</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="3">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, autem natus optio quo quod repudiandae? Consequatur consequuntur cumque ex omnis, provident ullam vitae. Adipisci et hic maiores voluptate. Deserunt, voluptatibus?</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import KeenSliderSlide from '../components/KeenSliderSlide.vue';
import AnimatedText from '../components/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();
</script>
