import { argv, exit } from 'node:process';
import Session, { set } from 'm3api';
import { queryFullPages } from 'm3api-query';

const SKIP_TITLES = set(
	'MediaWiki:Centralnotice-template-WMDE FR 2026 Desktop Popup Test ctrl',
	'MediaWiki:Centralnotice-template-WMDE FR 2026 Mobile Popup Test ctrl',
);

let verbose = false;
for ( const arg of argv.slice( 2 ) ) {
	switch ( arg ) {
		case '--verbose':
			verbose = true;
			break;
		default:
			console.error( `Unknown option or argument: ${ arg }` );
			exit( 1 );
			break;
	}
}

const session = new Session( 'meta.wikimedia.org', {
	formatversion: 2,
	errorformat: 'plaintext',
}, {
	userAgent: 'fundraising-banner-linter ([[User:Lucas Werkmeister (WMDE)]])',
} );

for await ( const page of queryFullPages( session, {
	generator: 'allpages',
	gapprefix: 'Centralnotice-template-WMDE FR',
	gapnamespace: 8, // NS_MEDIAWIKI
	gaplimit: '25',
	prop: set( 'revisions' ),
	rvprop: set( 'content' ),
	rvslots: set( 'main' ),
} ) ) {
	const {
		title,
		revisions: [ { slots: { main: { content } } } ]
	} = page;
	if ( SKIP_TITLES.has( title ) ) {
		if ( verbose ) {
			console.log( `Skipping page (hard-coded): ${ title } ` );
		}
		continue;
	}
	const match = title.match( /\b(?:ctrl|var)\b/ );
	if ( match === null ) {
		if ( verbose ) {
			console.log( `Skipping page (neither ctrl nor var): ${ title }` );
		}
		continue;
	}
	const ctrlOrVar = match[ 0 ];
	const pattern = `\\bdata-tracking="[^"]*-${ ctrlOrVar }(?:-[^"]*)?"`;
	if ( !new RegExp( pattern ).test( content ) ) {
		console.error( `Potential mismatch (looking for ${ pattern }): ${ title }` );
		if ( verbose ) {
			console.log( content );
		}
	} else if ( verbose ) {
		console.log( `Page OK (${ ctrlOrVar }): ${ title }` );
	}
}
