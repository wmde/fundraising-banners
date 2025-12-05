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
						<div class="wmde-b-icon-text__text wmde-c-flow wmde-b-prose">
							<div>
								<h2>Danke!</h2>
								<p>Sie alle haben Wikipedia in diesen bewegten Zeiten den Rücken gestärkt – ob Sie nun gespendet oder mit dem Lesen von Artikeln die ungebrochene Relevanz dieses einzigartigen Projektes bewiesen haben! Ein kraftvolles Signal für unabhängiges und verlässliches Wissen, gerade zum bevorstehenden 25. Geburtstag von Wikipedia.</p>
							</div>

							<div class="wmde-b-profile wmde-c-cluster">
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Franziska_Heine.png" alt="Franziska Heine">
								<div>
									<h3>Ihre Franziska Heine</h3>
									<p>Geschäftsführende Vorständin Wikimedia Deutschland e. V.</p>
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
							<Disclosure>
								<template #header>
									<h2>Wissen ist menschlich.</h2>
									<p>In Zeiten von KI und Desinformation braucht Wissen Schutz – durch Menschen, nicht Maschinen.</p>
								</template>

								<template #content>
									<p>In wenigen Tagen wird Wikipedia 25. Wir feiern die vielen Freiwilligen, die seither die größte Enzyklopädie aller Zeiten geschaffen haben. In ihrer Freizeit schreiben und pflegen sie Millionen von Artikeln: gemeinschaftlich und nach festen Regeln. Der Neutralität verpflichtet, auf Fakten gestützt und mit Quellen belegt. Dafür steht die Wikipedia seit ihrer Gründung. Es sind echte Menschen, deren Arbeit wir vertrauen können – weil sie transparent und überprüfbar ist.</p>
									<p>Heute verändert sich die Suche nach Wissen durch KI-Chatbots grundlegend. Auch wenn sie verlässlich erscheinen, sind sie Maschinen ohne Bewusstsein für richtig und falsch. Bei dem, was sie als Fakten und Wissen ausgeben, ist immer Vorsicht geboten. Wie auch gegenüber jenen, die sie als Geschäftsmodell betreiben. Solchen Algorithmen und ihren Besitzern mit eigenen Interessen dürfen wir das Wissen der Menschheit nicht überlassen. Mehr denn je brauchen wir eine Wikipedia, hinter der vertrauenswürdige Menschen stehen!</p>
								</template>
							</Disclosure>
						</div>
					</div>
				</div>
				<div class="wmde-b-content-card">
					<div class="wmde-b-icon-text">
						<div class="wmde-b-icon-text__icon">
							<StarIcon/>
						</div>
						<div class="wmde-b-icon-text__text wmde-c-flow">
							<Disclosure>
								<template #header>
									<h2>Helfen auch.</h2>
									<p>Als Fördermitglied bleiben Sie dauerhaft Teil unserer Idee von freiem Wissen.</p>
								</template>
								<template #content>
									<p>Als deutscher Förderverein hinter Wikipedia stärken wir den Freiwilligen den Rücken und sichern die technische Infrastruktur. Das ist nur möglich dank der vielen tollen Menschen, die in den vergangenen Wochen gespendet haben. Noch mehr Planungssicherheit ermöglicht uns allerdings die regelmäßige Unterstützung engagierter Fördermitglieder.</p>
									<p>Deshalb meine Bitte: Werden Sie Fördermitglied von Wikimedia Deutschland und helfen Sie mit Ihrem Beitrag, die Zukunft und Weiterentwicklung von Wikipedia langfristig zu sichern.</p>
									<p>Als Fördermitglied tragen Sie dazu bei, dass Wikipedia ein Bollwerk des verlässlichen Wissens bleibt. Unabhängig, kostenlos – und im besten Sinne menschlich.</p>
									<p><strong>Vielen Dank!</strong></p>

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
								</template>
							</Disclosure>

							<div class="wmde-b-cta wmde-c-flow">
								<div><button class="wmde-b-button" fill-width>Mit 5 € im Monat fördern</button></div>
								<div><button class="wmde-b-button" data-secondary fill-width>Mit einem anderen Betrag fördern</button></div>
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
					<p><em><small>Foto: Jason Krüger für Wikimedia Deutschland  / Portrait - 2334545</small></em></p>
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
import StarIcon from './Icons/StarIcon.vue';
import TickIcon from './Icons/TickIcon.vue';
import Disclosure from './Disclosure.vue';

interface Props {
	visible: boolean;
}

const props = defineProps<Props>();
defineEmits( [ 'close', 'membershipWithAmount', 'membershipWithoutAmount' ] );

const modal = ref<HTMLDialogElement>();

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		modal.value.showModal();
	} else {
		modal.value.close();
	}
} );

</script>
