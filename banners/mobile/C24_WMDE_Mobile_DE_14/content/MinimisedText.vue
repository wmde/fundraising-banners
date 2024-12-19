<template>
	<InfoIconStraight/> Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
	<a class="wmde-banner-minimised-expand" href="#" @click.prevent="$emit( 'showFullPageBanner' )">Dann geben Sie jetzt etwas zurück!&nbsp;<HeartIcon/></a>
</template>

<script setup lang="ts">
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import HeartIcon from '@src/components/Icons/HeartIcon.vue';
defineEmits( [ 'showFullPageBanner' ] );
</script>
