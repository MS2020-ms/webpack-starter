
//importo el metodo desde otro archivo -> componentes.js
//importo archivo styles.css

import { saludar } from './js/componentes.js';
import './styles.css';

//const en este archivo solo para navegadores actualizados!!!
const nombre = 'Mikel';
saludar(nombre);