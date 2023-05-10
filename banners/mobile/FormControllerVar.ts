import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { Tracker } from '@src/tracking/Tracker';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { AddressTypeFormPageShownEvent } from '@src/tracking/events/AddressTypeFormPageShownEvent';

export const MAIN_DONATION_INDEX = 0;
export const UPGRADE_TO_YEARLY_INDEX = 1;
export const ADDRESS_TYPES_INDEX = 2;

export class FormControllerVar implements FormController {

	private readonly _formModel: FormModel;
	private readonly _pageScroller: PageScroller;

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: ( tracking?: string ) => void;
	private _tracker: Tracker;

	public constructor( formModel: FormModel, pageScroller: PageScroller, tracker: Tracker ) {
		this._formModel = formModel;
		this._pageScroller = pageScroller;
		this._tracker = tracker;
	}

	public submitStep( submitData: FormSubmitData ): void {
		const { interval, paymentMethod } = this._formModel;

		switch ( submitData.pageIndex ) {
			case MAIN_DONATION_INDEX:
				this._pageScroller.scrollIntoView( '.wmde-banner-form' );
				if ( interval.value !== Intervals.ONCE.value || paymentMethod.value === PaymentMethods.SOFORT.value ) {
					this._goToStepCallback( ADDRESS_TYPES_INDEX );
					this._tracker.trackEvent( new AddressTypeFormPageShownEvent() );
					return;
				}
				this._tracker.trackEvent( new UpgradeToYearlyFormPageShownEvent() );
				this._nextCallback();
				break;
			case UPGRADE_TO_YEARLY_INDEX:
				interval.value = submitData.extraData.upgradeToYearlyInterval;
				this._nextCallback();
				break;
			case ADDRESS_TYPES_INDEX:
				// TODO tracking?
				this._submitCallback();
				break;
		}
	}

	public next( step: FormSubmitData ): void {
		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.YEARLY.value;
				this._goToStepCallback( MAIN_DONATION_INDEX );
				break;
			case ADDRESS_TYPES_INDEX:
				this._tracker.trackEvent( new AddressTypeFormPageShownEvent() );
				this._goToStepCallback( ADDRESS_TYPES_INDEX );
				break;
			default:
				this._nextCallback();
		}
	}

	public previous( step: FormSubmitData ): void {
		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.ONCE.value;
				this._previousCallback();
				break;
			case ADDRESS_TYPES_INDEX:
				this._goToStepCallback( MAIN_DONATION_INDEX );
				break;
			default:
				this._previousCallback();
		}
	}

	public onNext( callback: () => void ): void {
		this._nextCallback = callback;
	}
	public onPrevious( callback: () => void ): void {
		this._previousCallback = callback;
	}
	public onGoToStep( callback: ( step: number ) => void ): void {
		this._goToStepCallback = callback;
	}
	public onSubmit( callback: ( tracking?: string ) => void ): void {
		this._submitCallback = callback;
	}
}
