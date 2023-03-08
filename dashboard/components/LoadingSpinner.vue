<template>
	<div class="loading-spinner" :class="{ 'loading-spinner-small': small }" v-if="loading">
		<div class="loading-spinner-rect1"></div>
		<div class="loading-spinner-rect2"></div>
		<div class="loading-spinner-rect3"></div>
		<div class="loading-spinner-rect4"></div>
		<div class="loading-spinner-rect5"></div>
	</div>
</template>

<script setup lang="ts">

defineProps( {
	loading: {
		type: Boolean
	},
	small: {
		type: Boolean
	}
} );
</script>

<style lang="scss">
.loading-spinner {
	width: 65px;
	text-align: center;
}

.loading-spinner-small {
	width: 40px;
}

.loading-spinner-rect1,
.loading-spinner-rect2,
.loading-spinner-rect3,
.loading-spinner-rect4,
.loading-spinner-rect5 {
	display: inline-block;
	width: 4px;
	height: 18px;
	margin-right: 3px;
	background-color: #11eb04;
	animation: loading-spinner-rect 1.2s infinite ease-in-out;
}
.loading-spinner-rect2 {
	animation-delay: -1.1s;
}

.loading-spinner-rect3 {
	animation-delay: -1s;
}

.loading-spinner-rect4 {
	animation-delay: -0.9s;
}

.loading-spinner-rect5 {
	animation-delay: -0.8s;
}

@keyframes loading-spinner-rect {
	0% {
		transform: scale( 1 );
	}
	20% {
		transform: scale( 1, 2.5 );
	}
	40% {
		transform: scale( 0.75 );
	}
}
</style>
