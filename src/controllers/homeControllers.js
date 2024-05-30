const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    //console.log(req.flash('error'), req.flash('success'), req.flash('info'));
    res.render('index', { contatos });
};


