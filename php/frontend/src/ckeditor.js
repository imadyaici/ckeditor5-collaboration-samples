/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';

class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Alignment,
	Autoformat,
	Autosave,
	BlockQuote,
	Bold,
	CKFinder,
	CloudServices,
	Comments,
	EasyImage,
	Essentials,
	FontFamily,
	FontSize,
	Heading,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Strikethrough,
	Table,
	TableToolbar,
	TrackChanges,
	Underline,
	UploadAdapter
];

// The editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'|',
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'|',
			'link',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'|',
			'undo',
			'redo',
			'|',
			'comment',
			'|',
			'trackChanges'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'comment'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		],
		tableToolbar: [ 'comment' ]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

export default { ClassicEditor, EditorWatchdog };
