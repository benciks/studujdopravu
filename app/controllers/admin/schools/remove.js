const db = require('../../../models/schoolModel');

exports.post = async (req,res) => {
  await db.removeSchoolById(req.params.schoolId);
  res.redirect('/admin/schools');
}
