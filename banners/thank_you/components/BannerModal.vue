<template>
	<dialog class="wmde-b-modal" ref="modal">
		<div class="wmde-c-wrapper">
			<CloseButton :label="$translate( 'close-full-page' ) + '&nbsp;&nbsp;'" @click="$emit( 'close' )"/>
			<div class="wmde-c-flow">
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<HeartIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow">
							<div>
								<h2>Danke!</h2>
								<p>Denn nur mit Menschen wie Ihnen bleibt Wikipedia unabhängig.</p>
							</div>

							<div class="wmde-b-profile wmde-c-cluster">
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Franziska_Heine.png" alt="Franziska Heine">
								<div>
									<h3>Ihre Franziska Heine</h3>
									<p>Geschäftsführende Vorständin von Wikimedia Deutschland</p>
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
							<details class="wmde-b-disclosure wmde-c-flow wmde-b-prose" ref="responsibilityDialogue">
								<summary class="wmde-c-repel" data-nowrap>
									<hgroup>
										<h2>Unsere Verantworung.</h2>
										<p>In Zeiten von KI und Desinformation braucht Wissen Schutz – durch Menschen, nicht Maschinen.</p>
									</hgroup>
									<ChevronDownIcon/>
								</summary>

								<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
								<h3>Zwischenheadline</h3>
								<p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
							</details>
							<div>
								<button class="wmde-b-link-button" @click="responsibilityDialogue.open = !responsibilityDialogue.open">Read More</button>
							</div>
						</div>
					</div>
				</div>
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<StarIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow">
							<details class="wmde-b-disclosure wmde-c-flow wmde-b-prose" ref="connectDialogue">
								<summary class="wmde-c-repel" data-nowrap>
									<hgroup>
										<h2>Verbinden.</h2>
										<p>Als Fördermitglied bleiben Sie dauerhaft Teil unserer Idee von freiem Wissen.</p>
									</hgroup>
									<ChevronDownIcon/>
								</summary>

								<p>Mit einer Fördermitgliedschaft hilfst du, Wikipedia unabhängig und technisch stark zu halten. Dein Beitrag ermöglicht es uns, auch in Zeiten von KI, Desinformation und digitalen Umbrüchen verlässliches Wissen für alle zugänglich zu machen. Dein Beitrag ermöglicht es uns, auch in Zeiten von KI, Desinformation und digitalen Umbrüchen verlässliches Wissen für alle zugänglich zu machen.</p>

								<div class="wmde-c-cluster wmde-b-stats">
									<div class="wmde-b-stats__item">
										<figure>
											<PeopleIcon/>
										</figure>
										<p><strong>111.500</strong><br>fördernde Mitglieder</p>
									</div>
									<div class="wmde-b-stats__item">
										<figure>
											<AverageIcon/>
										</figure>
										<p><strong>5 €</strong><br>durchschnittlicher Monatsbeitrag</p>
									</div>
									<div class="wmde-b-stats__item">
										<figure>
											<CoinIcon/>
										</figure>
										<p><strong>2 €</strong><br>Mindestbeitrag im Monat</p>
									</div>
								</div>
							</details>
							<div>
								<button class="wmde-b-link-button" @click="connectDialogue.open = !connectDialogue.open">Read More</button>
							</div>
							<div class="wmde-b-cta">
								<button class="wmde-b-button" fill-width>Mit 5 € im Monat fördern</button>
							</div>
							<div class="wmde-b-cta">
								<button class="wmde-b-button" data-secondary fill-width>Mit einem anderen Betrag fördern</button>
							</div>
							<ul class="wmde-b-checkmark-list">
								<li><TickIcon/>Mitgliedsbeiträge sind steuerlich absetzbar</li>
								<li><TickIcon/>Automatische Zuwendungsbescheinigung</li>
								<li><TickIcon/>Kein Risiko: Kündigung jederzeit einfach möglich</li>
								<li><TickIcon/>Auf Wunsch: Unser exklusiver Wikipedia-Stoffbeutel</li>
							</ul>
						</div>
					</div>
				</div>
				<footer class="wmde-c-repel">
					<p><em>Foto: Jason Krüger für Wikimedia Deutschland  / Portrait - 2334545</em></p>
					<p class="wmde-c-cluster">
						<a href="#">Was ihre Spende bewirkt</a><a href="#">Mehr Infos auf unserer Website</a>
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
import ChevronDownIcon from './Icons/ChevronDownIcon.vue';
import PeopleIcon from './Icons/PeopleIcon.vue';
import AverageIcon from './Icons/AverageIcon.vue';
import CoinIcon from './Icons/CoinIcon.vue';
import StarIcon from './Icons/StarIcon.vue';
import TickIcon from './Icons/TickIcon.vue';

interface Props {
	visible: boolean;
}

const props = defineProps<Props>();
defineEmits( [ 'close', 'membershipWithAmount', 'membershipWithoutAmount' ] );

const modal = ref<HTMLDialogElement>();
const responsibilityDialogue = ref<HTMLDetailsElement>( null );
const connectDialogue = ref<HTMLDetailsElement>( null );

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		modal.value.showModal();
	} else {
		modal.value.close();
	}
} );

</script>
