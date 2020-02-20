const db = require ('../../../models/pageModel');
const { check, validationResult } = require('express-validator');
const QuillDeltaToHtml = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

exports.get = (req,res) => {
  if (req.user) {
    res.render('admin/pages/create', {
      title: 'Admin | Pridať stránku',
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
        title: 'Admin | Pridať stránku',
        errors: validation.errors
      });
    } else {
      const {name, url, content } = req.body;
      if (url == 'skoly') {
        validation.errors.push({ msg: 'Stránka s danou url už existuje'});
        return res.render('admin/pages/create', {
          title: 'Admin | Pridať stránku',
          errors: validation.errors
        });
      }

      const result = await db.getPageByUrl(url);

      if (result.length > 0) {
        validation.errors.push({ msg: 'Stránka s danou url už existuje'});
        return res.render('admin/pages/create', {
          title: 'Admin | Pridať stránku',
          errors: validation.errors
        });
      }

      const delta = JSON.parse(content).ops;
      const converter = new QuillDeltaToHtml(delta, {inlineStyles: true});
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
    check('name').not().isEmpty({ ignore_whitespace:true }).withMessage('Zadajte meno'),
    check('url').not().isEmpty({ ignore_whitespace:true }).trim().withMessage('Zadajte url adresu stránky'),
  ];
  return checks;
}
