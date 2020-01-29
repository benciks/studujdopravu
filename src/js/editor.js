import Quill from "../../node_modules/quill";

const quill = new Quill('#editor', {
  theme: 'snow'
});

let form = document.querySelector("#identifier");

form.addEventListener('submit', () => {
  let content = document.querySelector('input[name=content]');
  content.value = JSON.stringify(quill.getContents());
})


