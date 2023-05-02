<template>
    <div class="wmde-banner-main">
        <ButtonClose @click.prevent="$emit( 'close' )"/>
        <div class="wmde-banner-content">
            <div class="wmde-banner-column-left">
                <slot name="banner-slides" :play="slideshowShouldPlay"/>
                <slot name="progress"/>
            </div>
            <div class="wmde-banner-column-right">
                <slot name="donation-form" :form-interaction="onFormInteraction"/>
            </div>
        </div>
        <slot name="footer"/>
    </div>
</template>

<script setup lang="ts">
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { computed, ref } from 'vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

interface Props {
	bannerState: BannerStates;
}

const props = defineProps<Props>();
defineEmits( [ 'close' ] );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed(
	() => props.bannerState === BannerStates.Visible && !slideShowStopped.value
);
const onFormInteraction = (): void => {
	slideShowStopped.value = true;
};
</script>
