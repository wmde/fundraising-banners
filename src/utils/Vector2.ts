export class Vector2 {
	public x: number;
	public y: number;

	constructor( x: number, y: number ) {
		this.x = x;
		this.y = y;
	}

	public add( vector2: Vector2 ): Vector2 {
		return new Vector2( this.x + vector2.x, this.y + vector2.y );
	}
}
