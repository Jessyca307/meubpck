import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './frontend/modulos/login';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();

//import './frontend/assets/css/style.css';