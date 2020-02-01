const db = require ('../../../models/pageModel');
const { check, validationResult } = require('express-validator');
const QuillDeltaToHtml = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

exports.get = (req,res) => {
  if (req.user) {
    res.render('admin/pages/create');
  } else {
    res.redirect('/login');
  }
}

exports.post = async (req,res) => {
  if (req.user) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.render('admin/pages/create', {errors: validation.errors});
    } else {
      const {name, url, content } = req.body;
      const result = await db.getPageByUrl(url);

      if (result.length > 0) {
        return res.render('admin/pages/create', {errors: ['Page with this url already exists']});
      }

      const delta = JSON.parse(content).ops;
      const converter = new QuillDeltaToHtml(delta, {});
      const html = converter.convert();

      db.addPage(name, url, html);
      res.redirect('/admin/pages');
    }
  } else {
    res.redirect('/login');
  }
}

exports.validate = () => {
  let checks = [
    check('name').not().isEmpty().withMessage('Enter name'),
    check('url').not().isEmpty().withMessage('Enter page url'),
  ];
  return checks;
}
