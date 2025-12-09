<template>
	<dialog class="wmde-b-modal" ref="modal" aria-labelledby="wmde-banner-model-blurb" tabindex="-1">
		<div class="wmde-c-wrapper">
			<CloseButton
				class="wmde-u-sticky"
				:label="$translate( 'close-full-page' ) + '&nbsp;&nbsp;'"
				:thank-you-content="thankYouContent"
				@click="$emit( 'close' )"
			/>
			<div class="wmde-c-flow">
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<HeartIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow wmde-b-prose" id="wmde-banner-model-blurb">
							<div>
								<h2>{{ thankYouContent[ 'main-message-title' ] }}</h2>
								<p>{{ thankYouContent[ 'main-message-content' ] }}</p>
							</div>

							<div class="wmde-b-profile wmde-c-cluster">
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Franziska_Heine.png" alt="Franziska Heine">
								<div>
									<h3>{{ thankYouContent[ 'main-message-name' ] }}</h3>
									<p>{{ thankYouContent[ 'main-message-position' ] }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<GlobeIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow">
							<Disclosure id="wmde-banner-knowledge">
								<template #header>
									<h2>{{ thankYouContent[ 'knowledge-title' ] }}</h2>
									<p>{{ thankYouContent[ 'knowledge-subtitle' ] }}</p>
								</template>

								<template #content>
									<p v-for="( paragraph, index ) in thankYouContent[ 'knowledge-content' ]" :key="index">{{ paragraph }}</p>
								</template>
							</Disclosure>
						</div>
					</div>
				</div>
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<MembersIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow">
							<Disclosure id="wmde-banner-help">
								<template #header>
									<h2>{{ thankYouContent[ 'help-title' ] }}</h2>
									<p>{{ thankYouContent[ 'help-subtitle' ] }}</p>
								</template>
								<template #content>
									<p v-for="( paragraph, index ) in thankYouContent[ 'help-content' ]" :key="index">{{ paragraph }}</p>
									<p><strong>{{ thankYouContent[ 'help-thank-you' ] }}</strong></p>

									<div class="wmde-c-cluster wmde-b-stats">
										<div class="wmde-b-stats__item">
											<figure>
												<PeopleIcon/>
											</figure>
											<p><strong>{{ thankYouContent.stats[ 0 ].number }}</strong><br>{{ thankYouContent.stats[ 0 ].text }}</p>
										</div>
										<div class="wmde-b-stats__item">
											<figure>
												<AverageIcon/>
											</figure>
											<p><strong>{{ thankYouContent.stats[ 1 ].number }}</strong><br>{{ thankYouContent.stats[ 1 ].text }}</p>
										</div>
										<div class="wmde-b-stats__item">
											<figure>
												<CoinIcon/>
											</figure>
											<p><strong>{{ thankYouContent.stats[ 2 ].number }}</strong><br>{{ thankYouContent.stats[ 2 ].text }}</p>
										</div>
									</div>
								</template>
							</Disclosure>

							<div class="wmde-b-cta wmde-c-flow">
								<div><button class="wmde-b-button" fill-width>{{ thankYouContent[ 'cta-donate-5' ] }}</button></div>
								<div><button class="wmde-b-button" data-secondary fill-width>{{ thankYouContent[ 'cta-donate-other' ] }}</button></div>
							</div>

							<ul class="wmde-b-checkmark-list">
								<li v-for="( reason, index ) in thankYouContent[ 'reasons' ]" :key="index"><TickIcon/>{{ reason }}</li>
							</ul>
						</div>
					</div>
				</div>
				<footer class="wmde-c-repel">
					<p><em><small>{{ thankYouContent[ 'photo-credit' ] }}</small></em></p>
					<p class="wmde-c-cluster">
						<slot name="subscribe"/>
					</p>
				</footer>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import CloseButton from './CloseButton.vue';
import HeartIcon from './Icons/HeartIcon.vue';
import GlobeIcon from './Icons/GlobeIcon.vue';
import PeopleIcon from './Icons/PeopleIcon.vue';
import AverageIcon from './Icons/AverageIcon.vue';
import CoinIcon from './Icons/CoinIcon.vue';
import MembersIcon from './Icons/MembersIcon.vue';
import TickIcon from './Icons/TickIcon.vue';
import Disclosure from './Disclosure.vue';
import { ThankYouContent } from '@src/domain/EditableContent/ThankYouContent';

interface Props {
	visible: boolean;
	thankYouContent: ThankYouContent;
}

const props = defineProps<Props>();
defineEmits( [ 'close', 'membershipWithAmount', 'membershipWithoutAmount' ] );

const modal = ref<HTMLDialogElement>();

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		modal.value.showModal();
		modal.value.focus();
	} else {
		modal.value.close();
	}
} );

</script>
