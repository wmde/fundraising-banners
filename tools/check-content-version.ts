import { exec } from 'child_process';
import chalk from 'chalk';

// This is a script that checks if the fundraising-frontend-content package has a newer version
// than the one currently installed. This is useful to check if the content has been updated
// in the remote repository and the package-lock.json file needs to be updated.
// Run this before builing the banners

const CONTENT_REPO_URL = 'github.com/wmde/fundraising-frontend-content.git';
const CONTENT_REPO_BRANCH = 'production';

async function execShellCommand( cmd: string ): Promise<string> {
	return new Promise( ( resolve, reject ) => {
		// eslint-disable-next-line security/detect-child-process
		exec( cmd, ( error, stdout, stderr ) => {
			if ( error ) {
				console.error( stderr );
				reject( error );
			}
			resolve( stdout );
		} );
	} );
}

async function getCommitIdFromPackageLock(): Promise<string> {
	const output = await execShellCommand( 'npm list --package-lock-only' );
	const commitId = output.match( new RegExp( `${CONTENT_REPO_URL}#([0-9a-f]+)` ) );
	if ( !commitId || !commitId[ 1 ] ) {
		throw new Error( `${ chalk.red( 'Error:' ) } Could not determine commit id for content from package-lock.json` );
	}
	return commitId[ 1 ];
}

async function getCommitIdFromRemoteRepo(): Promise<string> {
	const output = await execShellCommand( `git ls-remote --heads https://${CONTENT_REPO_URL}` );
	const commitId = output.match( new RegExp( `([0-9a-f]+)\\s+refs/heads/${CONTENT_REPO_BRANCH}` ) );
	if ( !commitId || !commitId[ 1 ] ) {
		throw new Error( `${ chalk.red( 'Error:' ) } Could not determine commit it for content from remote repository` );
	}
	return commitId[ 1 ];
}

Promise.all( [ getCommitIdFromPackageLock(), getCommitIdFromRemoteRepo() ] ).then( ( [ localCommitId, remoteCommitId ] ) => {
	if ( localCommitId !== remoteCommitId ) {
		console.log(
			`${ chalk.red( 'Error: ' ) }` +
			`Content version mismatch, local version is ${localCommitId}, remote is ${remoteCommitId}.
			Please run "npm run update-content" to update the package-lock.json file.`.replace( /\n\s+/g, '\n' )
		);
		process.exit( 1 );
	}
} );
