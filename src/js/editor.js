import getSlug from '../../node_modules/speakingurl';
import BlotFormatter from "quill-blot-formatter";

// Quill instance
Quill.register("modules/blotFormatter", BlotFormatter);

// Custom Toolbar icons for tables
let icons = Quill.import('ui/icons');
icons['insert-table'] = '<img src="/img/svg/create-table.svg" onload="SVGInject(this)">';
icons['insert-row-above'] = '<img src="/img/svg/insert-row-above.svg" onload="SVGInject(this)">';
icons['insert-row-below'] = '<img src="/img/svg/insert-row-below.svg" onload="SVGInject(this)">';
icons['insert-column-left'] = '<img src="/img/svg/insert-column-left.svg" onload="SVGInject(this)">';
icons['insert-column-right'] = '<img src="/img/svg/insert-column-right.svg" onload="SVGInject(this)">';
icons['remove-row'] = '<img src="/img/svg/remove-row.svg" onload="SVGInject(this)">';
icons['remove-column'] = '<img src="/img/svg/remove-column.svg" onload="SVGInject(this)">';
icons['remove-table'] = '<img src="/img/svg/remove-table.svg" onload="SVGInject(this)">';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  [ 'link', 'image'],
  ['clean'],
  ['insert-table', 'insert-row-above', 'insert-row-below', 'insert-column-left', 'insert-column-right', 'remove-row', 'remove-column','remove-table']
];

const quill = new Quill('#editor', {
  modules: {
    table: true,
    blotFormatter: {},
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler
      }
    }
  },
  placeholder: 'Napíšte obsah stránky',
  theme: 'snow'
});

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
}

// Beautify url
let pageName = document.getElementById('name');
let pageUrl = document.getElementById('url');
pageName.addEventListener('input', () => {
    pageUrl.value = getSlug(pageName.value);
})

// Table controls
const table = quill.getModule('table');

document.querySelector('.ql-insert-table').addEventListener('click', function() {
  table.insertTable(2, 2);
});
document.querySelector('.ql-insert-row-above').addEventListener('click', function() {
  table.insertRowAbove();
});
document.querySelector('.ql-insert-row-below').addEventListener('click', function() {
  table.insertRowBelow();
});
document.querySelector('.ql-insert-column-left').addEventListener('click', function() {
  table.insertColumnLeft();
});
document.querySelector('.ql-insert-column-right').addEventListener('click', function() {
  table.insertColumnRight();
});
document.querySelector('.ql-remove-row').addEventListener('click', function() {
  table.deleteRow();
});
document.querySelector('.ql-remove-column').addEventListener('click', function() {
  table.deleteColumn();
});
document.querySelector('.ql-remove-table').addEventListener('click', function() {
  table.deleteTable();
});

// Send Quill Delta to server
let form = document.querySelector("#identifier");

form.addEventListener('submit', () => {
  let content = document.querySelector('input[name=content]');
  content.value = JSON.stringify(quill.getContents());
})
