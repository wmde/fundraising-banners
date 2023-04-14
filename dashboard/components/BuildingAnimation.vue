<template>
	<div class="building-animation" :class="{ 'loading': loading }">
		<div class="building-animation-1"></div>
		<div class="building-animation-2"></div>
		<div class="building-animation-3"></div>
	</div>
</template>

<script setup lang="ts">

interface Props {
	loading: boolean;
}

defineProps<Props>();

</script>

<style lang="scss">
@keyframes loading {
	0% {
		transform: scale( 1 );
		opacity: 1;
	}
	100% {
		transform: scale( 2 );
		opacity: 0;
	}
}

.banner-actions {
	.building-animation {
		display: none;
		position: relative;

		&.loading {
			display: block;
		}

		&-1,
		&-2,
		&-3 {
			content: '';
			position: absolute;
			height: 28px;
			width: 28px;
			border: 1px solid #7aa053;
			border-radius: 50%;

			animation: loading 1200ms ease-in-out;
			animation-iteration-count: infinite;
		}

		&-2 {
			animation-delay: 400ms;
		}

		&-3 {
			animation-delay: 800ms;
		}
	}
}
</style>
