const Login = require('../models/loginModuls');


exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
   // console.log(req.session.user);
    return res.render('login');
   
};

exports.register = async function (req, res)  {
   try{ 
    const login = new Login(req.body);
    
    await login.register();
    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(() => {
         return res.redirect('back');
        });
        return;
    }
    req.flash('success','Seu usuario foi criado com sussesso.');
    req.session.save(() => {
     return res.redirect('back');
    });

    //res.send(login.errors);
        
    } catch(e) {
        console.log(e);
        return res.render('404');
    } 
 };
 
 exports.login = async function (req, res)  {
    try{ 
     const login = new Login(req.body);
     
     await login.login();
     if (login.errors.length > 0) {
         req.flash('errors', login.errors);
         req.session.save(() => {
          return res.redirect('back');
         });
         return;
     }

     req.flash('success','Você entrou no sistema.');
     req.session.user = login.user;
     req.session.save(() => {
      return res.redirect('back');
     });
         
     } catch(e) {
         console.log(e);
         return res.render('404');
     } 
  };

  exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
  };
  