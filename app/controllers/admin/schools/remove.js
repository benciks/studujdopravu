const db = require('../../../models/schoolModel');

exports.post = async (req,res) => {
  if(req.user) {
    await db.removeSchoolById(req.params.schoolId);
    res.redirect('/admin/schools');
  } else {
    res.redirect('/login');
  }
}
