import Flickity from 'flickity';

export class Slider {
	/**
	 * Creates slider object if it has not been instantiated previously
	 */
	initialize() {
		if ( this.hasOwnProperty( 'slider' ) === false ) {
			this.slider = new Flickity( document.querySelector( '.mini-banner-carousel' ), {
				wrapAround: true,
				prevNextButtons: false
			} );
		}
		this.slider.on( 'change', this.onChange.bind( this ) );
		this.viewedSlides = 1;
	}

	/**
	 * Handler for "select" event which is triggered when a new slide is shown
	 */
	onChange() {
		this.viewedSlides++;
	}

	getViewedSlides() {
		return this.viewedSlides;
	}

	getCurrentSlide() {
		return this.slider.selectedIndex + 1;
	}
}
