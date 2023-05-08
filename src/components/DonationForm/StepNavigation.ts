// TODO find a better name, now that next and previous are gone
export interface StepNavigation {
	goToStep( pageName: string ): Promise<void>;
	submit( submitId: string ): Promise<void>;
}
