exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
     next();
 };

 exports.outroMiddleware = (req, res, next) => {
    console.log('sou outro Middleware')
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        //return res.send ('Bad CRSRF'); 
        res.render('404');
       
    }
   next()
};

exports.crsfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
};

/*module.exports = (req, res, next) => {
    if (req.body.cliente) {
     req.body.cliente = req.body.cliente.replace('miranda', 'Não use miranda');
     console.log();
     console.log(`vi que você postou ${req.body.cliente}`)
     console.log();
    }
     next();
 };*/