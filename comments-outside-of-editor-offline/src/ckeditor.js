/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';

import WideSidebar from '@ckeditor/ckeditor5-comments/src/annotations/widesidebar';

import CommentsRepository from '@ckeditor/ckeditor5-comments/src/comments/commentsrepository';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';

import ContextBase from '@ckeditor/ckeditor5-core/src/context';
import ContextPlugin from '@ckeditor/ckeditor5-core/src/contextplugin';

const channelId = 'e3a8erg86';

class NonEditorFieldsIntegration extends ContextPlugin {
	get requires() {
		return [ CommentsRepository ];
	}

	init() {
		this._annotations = this.context.plugins.get( 'Annotations' );
		this._annotationsUIs = this.context.plugins.get( 'AnnotationsUIs' );
		this._repository = this.context.plugins.get( 'CommentsRepository' );

		const channelId = this.context.config.get( 'collaboration.channelId' );

		// Handle non-editor comments that were loaded when comments adapter was initialized.
		for ( const thread of this._repository.getCommentThreads( { channelId } ) ) {
			this._handleCommentThread( thread );
		}

		// Handle non-editor comments add.
		this._repository.on( 'addCommentThread:' + channelId, ( evt, { threadId } ) => {
			this._handleCommentThread( this._repository.getCommentThread( threadId ) );
		}, { priority: 'low' } );

		// Handle non-editor comment remove.
		this._repository.on( 'removeCommentThread:' + channelId, ( evt, { threadId } ) => {
			const target = document.getElementById( threadId );

			target.classList.remove( 'has-comment', 'active' );
		}, { priority: 'low' } );

		// Handle non-editor active comment change.
		this._repository.on( 'change:activeCommentThread', ( evt, name, thread ) => {
			document.querySelectorAll( '.custom-target.active' ).forEach( el => el.classList.remove( 'active' ) );

			if ( thread ) {
				const target = document.getElementById( thread.id );

				if ( target ) {
					target.classList.add( 'active' );
				}
			}
		} );

		// Handle switching annotations UI.
		document.querySelectorAll( '.choose-ui button' ).forEach( el => {
			el.addEventListener( 'click', () => this._annotationsUIs.switchTo( el.dataset.ui ) );
		} );

		// Handle adding new non-editor comment.
		document.querySelectorAll( '.custom-target' ).forEach( target => {
			const threadId = target.id;
			const button = target.childNodes[ 0 ];

			button.addEventListener( 'click', () => {
				if ( !target.classList.contains( 'has-comment' ) ) {
					this._repository.openNewCommentThread( { channelId, threadId, target } );
				}
			} );
		} );
	}

	// Handle new non-editor comment thread.
	_handleCommentThread( thread ) {
		// DOM element connected with the thread & annotation.
		const target = this._getTarget( thread );

		// If the thread is not attached to a DOM element (target) yet, attach it.
		// `openNewCommentThread` takes `target` parameter and attaches the thread to the target when the thread is being created.
		// However, comment threads coming from remote clients need to be handled.
		// Since this function (`_handleCommentThread`) is applied both for remote and local comments thread, we need
		// to check if the thread was already attached to something.
		if ( !thread.isAttached ) {
			thread.attachTo( target );
		}

		// Add highlight to the target element to show that the field has a comment.
		target.classList.add( 'has-comment' );

		// Add `target` to appropriate focus trackers.
		// Annotations use focus trackers to reset active annotation when annotations becomes focused or blurred.
		// However, we don't want to unset active annotation when something in `target` is clicked.
		// For that reason, we add `target` to those focus trackers.
		// Thanks to that, whenever `target` is focused, given annotation will behave like it is focused too.
		const threadView = this._repository._threadToController.get( thread ).view;
		const annotation = this._annotations.collection.getByInnerView( threadView );

		annotation.focusableElements.add( target );
	}

	_getTarget( thread ) {
		return document.getElementById( thread.id );
	}
}

class CustomCommentsAdapter extends ContextPlugin {
	static get requires() {
		return [ CommentsRepository ];
	}

	init() {
		const users = this.context.plugins.get( 'Users' );

		// Add user data
		users.addUser( {
			id: 'user-1',
			name: 'John Smith'
		} );
		// Set the current user
		users.defineMe( 'user-1' );

		const repository = this.context.plugins.get( CommentsRepository );

		// Set the adapter on the `CommentsRepository#adapter` property
		repository.adapter = {
			// Write a request to your database here. The returned `Promise`
			// should resolve with the comment thread data.
			getCommentThread: () => {
				return Promise.resolve( {
					threadId: 'thread-1',
					comments: [
						{
							commentId: 'comment-1',
							authorId: 'user-1',
							content: '<p>Make sure to check other samples as well!</p>',
							createdAt: new Date(),
						}
					]
				} );
			},

			removeCommentThread: async () => {
				return Promise.resolve();
			},

			// Write a request to your database here. The returned `Promise`
			// should be resolved when the request has finished.
			// When the promise resolves with the comment data object, it
			// will update the editor comment using the provided data.
			addComment: () => {
				return Promise.resolve( {
					createdAt: new Date()	// Should be set on the server side.
				} );
			},

			// Write a request to your database here. The returned `Promise`
			// should be resolved when the request has finished.
			updateComment: () => {
				return Promise.resolve();
			},

			// Write a request to your database here. The returned `Promise`
			// should be resolved when the request has finished.
			removeComment: () => {
				return Promise.resolve();
			}
		};

		// This sample shows how initial comments can be fetched asynchronously
		// as the editor is initialized. Note, that the editor initialization
		// is delayed until the comments data is loaded.
		return this.getInitialComments();
	}

	getInitialComments() {
		const repository = this.context.plugins.get( CommentsRepository );

		return Promise.resolve( [
			{
				threadId: 'comment-1',
				comments: [ {
					commentId: 'comment-1',
					authorId: 'user-1',
					content: '<p>Comment on non-editor field</p>',
					createdAt: new Date()
				} ]
			},
			{
				threadId: 'comment-2',
				comments: [ {
					commentId: 'comment-2',
					authorId: 'user-1',
					content: '<p>Yet another comment on non-editor field</p>',
					createdAt: new Date()
				} ]
			}
		] ).then( commentThreadsData => {
			for ( const commentThread of commentThreadsData ) {
				repository.addCommentThread( { channelId, isFromAdapter: true, ...commentThread } );
			}
		} );
	}
}

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins =[
	Essentials,
	Autoformat,
	Alignment,
	BlockQuote,
	Bold,
	Italic,
	Underline,
	Heading,
	Link,
	List,
	Paragraph,
	Table,
	TableToolbar,
	FontFamily,
	FontSize,
	Comments
]

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'insertTable',
			'blockQuote',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'fontFamily',
			'fontSize',
			'alignment',
			'|',
			'undo',
			'redo',
			'|',
			'comment'
		]
	},
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
	},
	collaboration: {
		channelId: `${ channelId }-${ name }`
	}
}

class Context extends ContextBase {}

Context.builtinPlugins = [
	CustomCommentsAdapter,
	WideSidebar,
	NonEditorFieldsIntegration
]

Context.defaultConfig ={ 
	sidebar: {
		container: document.querySelector( '.sidebar' )
	},
	collaboration: {
		channelId
	}
}

export default { ClassicEditor, Context }
