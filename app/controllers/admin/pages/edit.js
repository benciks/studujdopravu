const db = require('../../../models/pageModel');
const { validationResult } = require('express-validator');
const QuillDeltaToHtml = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const createError = require('http-errors');

exports.get = async (req,res,next) => {
  if (req.user) {
    const result = await db.getPageById(req.params.pageId);

    if(!result.length) {
      next(createError(404));
      return
    }

    const { id, name, url, content} = result[0];
    res.render('admin/pages/create', {
      title: 'Admin | Upraviť stránku',
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
      return res.render('admin/pages/create', {
        title: 'Admin | Upraviť stránku',
        id: req.params.id,
        name: req.body.name,
        url: req.body.url,
        errors: validation.errors
      });
    } else {
      const { name, url, content } = req.body;
      const delta = JSON.parse(content).ops;
      const converter = new QuillDeltaToHtml(delta, {inlineStyles: true});
      const html = converter.convert();

      db.updatePageById(name, url, html, req.params.pageId);
      res.redirect('/admin/pages');
    }
  } else {
    res.redirect('/login');
  }
}
