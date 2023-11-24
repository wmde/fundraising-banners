/**
 * This is a subset of the full DOM Location interface,
 * containing only the properties we need, for easier testing.
 */
export interface LocationSlice {
	search: string;
}

export interface RuntimeEnvironment {
	isInDevMode: boolean;
	runsInDevEnvironment: boolean;
}

export class UrlRuntimeEnvironment implements RuntimeEnvironment {
	private _isInDevMode: boolean;
	private _runsInDevEnvironment: boolean;
	private _initialized: boolean;
	private readonly _location: LocationSlice;

	public constructor( location: LocationSlice ) {
		this._initialized = false;
		this._location = location;
		this._runsInDevEnvironment = false;
		this._isInDevMode = false;
	}

	private initialize(): void {
		if ( this._initialized ) {
			return;
		}
		// These are crude checks for the existence of strings in search params.
		// We save some cycles by not using a regex or splitting URL parameters.
		this._isInDevMode = this._location.search.indexOf( 'devMode' ) > -1;
		this._runsInDevEnvironment = this._location.search.indexOf( 'devbanner' ) > -1;
		this._initialized = true;
	}

	public get isInDevMode(): boolean {
		this.initialize();
		return this._isInDevMode || this._runsInDevEnvironment;
	}

	public get runsInDevEnvironment(): boolean {
		this.initialize();
		return this._runsInDevEnvironment;
	}

	public getBannerDelay( delayValue: number ): number {
		if ( this.isInDevMode ) {
			return 1;
		}
		return delayValue;
	}
}
