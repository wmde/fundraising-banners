export interface ReactiveProperty<T> {
	get value(): T;
	set value( value: T );
}
