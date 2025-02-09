import { TrackingParameters } from '@src/domain/TrackingParameters';

/**
 * This class encapsulates URL generation to an end point to the fundraising application and all parameters needed for
 * the fundraising application.
 *
 * The constructor takes the static, non-reactive values available in the entry point. The form components will use
 * the injected FormAction classes to dynamically generate a form action from the available, injected form actions
 * ( see `useFormAction` and other composables starting with `useFormAction`).
 *
 * If you need to add parameters inside a reactive property (`useFormAction`),
 * use the `setParameter` method of this class instead of using string concatenation!
 */
export class FormAction {
	private readonly url: string;
	private readonly params: Record<string, string>;
	public constructor( url: string, tracking: TrackingParameters, extraUrlParameters: Record<string, string> = {} ) {
		this.url = url;
		this.params = {
			/* eslint-disable camelcase */
			piwik_kwd: tracking.keyword,
			piwik_campaign: tracking.campaign,
			banner_submission: '1',
			/* eslint-enable camelcase */
			...extraUrlParameters
		};
	}

	public setParameter( name: string, value: string ): FormAction {
		this.params[ name ] = value;
		return this;
	}

	public get actionUrl(): string {
		const urlParams = new URLSearchParams( this.params );
		return `${this.url}?${urlParams}`;
	}

	public toString(): string {
		return this.actionUrl;
	}
}

/**
 * This class represents the available end points of the fundraising application.
 */
export class FormActionCollection {
	public constructor(
		public readonly donateWithAddressAction: FormAction,
		public readonly donateAnonymouslyAction: FormAction
	) {
	}
}
