exports.login = (req,res) => {
    res.render('auth/login', {
        title: "Login",
    })
}

exports.register = (req,res) => {
    res.render('auth/register', {
        title: "Register",
    })
}