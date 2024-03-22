/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    config.toolbar = 'toolbar1';

    config.toolbar_toolbar1 = [
    ['Source', '-', 'Undo', 'Redo'],
    ['Find', 'Replace'],
    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'],
    ['NumberedList', 'BulletedList', 'Blockquote', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
    '/',
    ['FontSize', 'TextColor', 'BGColor', '-', 'Link', 'Unlink', '-', 'Image', 'Table', 'SpecialChar', '-', 'Maximize']
    ];

	//// The toolbar groups arrangement, optimized for two toolbar rows.
    //config.toolbar_toolbar1 = [
	//	{ name: 'Source',   groups: [ 'source','-', 'Undo', 'redo' ] },
	//	{ name: 'Find',     groups: [ 'find', 'replace' ] },
	//	{ name: 'BasicStyles',   groups: ['bold', 'italic','underline','strike','-','removeformat'] },
	//	{ name: 'Paragraph',     groups: ['NumberedList','BulletedList','Blockquote','-','Outdent','Indent','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'] },
	//	'/',
	//	{ name: 'Others',     groups: ['FontSize','TextColor','BGColor','-','Link','Unlink','-','Image','Table','SpecialChar', '-', 'Maximize'] }
    //];


	//	{ name: 'links' },
	//	{ name: 'insert' },
	//	{ name: 'forms' },
	//	{ name: 'tools' },
	//	{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	//	{ name: 'others' },
	//	'/',
	//	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	//	{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	//	{ name: 'styles' },
	//	{ name: 'colors' },
	//	{ name: 'about' }
	
	
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	//config.removeButtons = 'Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

};
