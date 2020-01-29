const QuillDeltaToHtml = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const html2pug = require('html2pug');

exports.get = (req, res) => {
    res.render('admin/editor');
}

exports.post = (req,res) => {
  const { content } = req.body;
  const delta = JSON.parse(content).ops;
  const converter = new QuillDeltaToHtml(delta, {});
  const html = converter.convert();
  const pug = html2pug(html).substr(19);

  console.log(pug);
  res.redirect('/admin/editor');
}
