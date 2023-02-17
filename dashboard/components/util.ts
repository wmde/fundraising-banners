export function parseCompileInfo( webpackIndexText: string ): Record<string, { fileName: string, size?: string, date?: Date }> {
	const parser = new DOMParser();
	const doc = parser.parseFromString( webpackIndexText, 'text/html' );
	const compileInfo: Record<string, { fileName: string, size?: string, date?: Date }> = {};
	doc.querySelectorAll( '#files li a' ).forEach( ( node: Element ) => {
		const fileName = node.querySelector( '.name' )?.textContent;
		const bannerName = fileName?.replace( /\.js(\.wikitext)?$/, '' );
		if ( !fileName ) {
			console.log( 'Could not find name element in node', node );
			return;
		}
		const size = node.querySelector( '.size' )?.textContent;
		const date = node.querySelector( '.date' )?.textContent ? new Date( node.querySelector( '.date' )!.textContent ) : undefined;
		compileInfo[ bannerName! ] = { fileName: fileName!, size, date };
	} );
	return compileInfo;
}
