import Session, { set } from 'm3api';
import { queryFullPages } from 'm3api-query';

const SKIP_TITLES = set(
	'MediaWiki:Centralnotice-template-WMDE FR 2026 Desktop Popup Test ctrl',
	'MediaWiki:Centralnotice-template-WMDE FR 2026 Mobile Popup Test ctrl',
);

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
		continue;
	}
	const match = title.match( /\b(?:ctrl|var)\b/ );
	if ( match === null ) {
		continue;
	}
	const ctrlOrVar = match[ 0 ];
	const pattern = `\\bdata-tracking="[^"]*-${ ctrlOrVar }(?:-[^"]*)?"`;
	if ( !new RegExp( pattern ).test( content ) ) {
		console.error( `Potential mismatch in ${ title } (looking for ${ pattern })` );
	}
}
