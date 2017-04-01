
import { Component, AfterViewInit, EventEmitter, OnDestroy, Input, Output } from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html'
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {

  @Input() content: String;

  @Input() elementId: String;

  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  ngOnInit(){
    this.initTiny();

  }
  ngAfterViewInit() {
      this.initTiny();
    /*tinymce.init({
      selector: 'div.tinymce',
      theme: 'inlite',
      plugins: ['image', 'table', 'link', 'paste', 'contextmenu', 'textpattern', 'autolink'],
      insert_toolbar: ['quickimage', 'quicktable'],
      selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
      inline: true,
      paste_data_images: true,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    });
*/

    
  }

  initTiny(){
    tinymce.init({
          selector: 'div.editable',
          inline: true,
          //selector: '#' + this.elementId,
          plugins: ['link', 'table'],
          skin_url: '/assets/skins/lightgray',
          //themes: "modern",
          //theme: 'inlite',
          setup: editor => {
            this.editor = editor;
            editor.on('keyup change', () => {
              const content = editor.getContent();
              this.onEditorKeyup.emit(content);
            });
          }
        });
        tinymce.activeEditor.setContent(this.content);
  } 

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
