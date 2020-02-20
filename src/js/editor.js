const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],
  [ 'link', 'image'],
  ['clean']                                         // remove formatting button
];

const quill = new Quill('#editor', {
  modules: {
    imageResize: {},
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
  if(value){
      this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

let form = document.querySelector("#identifier");

form.addEventListener('submit', () => {
  let content = document.querySelector('input[name=content]');
  content.value = JSON.stringify(quill.getContents());
})


