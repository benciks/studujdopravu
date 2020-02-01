const db = require('../../../models/pageModel');
const { validationResult } = require('express-validator');
const QuillDeltaToHtml = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

exports.get = async (req,res) => {
  if (req.user) {
    const result = await db.getPageById(req.params.pageId);
    const { id, name, url, content} = result[0]
    res.render('admin/pages/edit', {
      id: id,
      name: name,
      url: url,
      content: content
    });
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render('admin/schools/edit', {errors: validation.errors});
    } else {
      const { name, url, content } = req.body;
      const delta = JSON.parse(content).ops;
      const converter = new QuillDeltaToHtml(delta, {});
      const html = converter.convert();

      db.updatePageById(name, url, html, req.params.pageId);
      res.redirect('/admin/pages');
    }
  } else {
    res.redirect('/login');
  }
}
