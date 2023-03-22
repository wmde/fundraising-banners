import Minerva from '@src/page/skin/Minerva';
import Monobook from '@src/page/skin/Monobook';
import Vector2022 from '@src/page/skin/Vector2022';
import Vector from '@src/page/skin/Vector';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';

export class SkinFactory {
	private mediaWiki: MediaWiki;

	public constructor( mediaWiki: MediaWiki ) {
		this.mediaWiki = mediaWiki;
	}

	public getSkin(): Skin {
		switch ( this.mediaWiki.getConfigItem( 'skin' ) ) {
			case 'minerva':
				return new Minerva();
			case 'monobook':
				return new Monobook();
			case 'vector-2022':
				return new Vector2022();
			default:
				return new Vector();
		}
	}
}
