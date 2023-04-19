<template>
	<span class="banner-actions-icon-copy-loader" :class="{ 'copying': isCopying }">
		<span class="banner-actions-icon-copy-loader-1"></span>
		<span class="banner-actions-icon-copy-loader-2"></span>
		<span class="banner-actions-icon-copy-loader-3"></span>
	</span>
</template>

<script setup lang="ts">

interface Props {
	isCopying: boolean;
}

defineProps<Props>();

</script>

<style lang="scss">
@keyframes copying {
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
	&-icon {
		&-copy-loader {
			display: none;
			position: relative;

			&.copying {
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

				animation: copying 600ms cubic-bezier( 0.6, 0.135, 0.79, 0.225 );
				animation-delay: 350ms;
			}

			&-2 {
				animation-delay: 400ms;
			}

			&-3 {
				animation-delay: 450ms;
			}
		}
	}
}
</style>
