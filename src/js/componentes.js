//importar .css
import '../css/componentes.css';
// import webpacklogo from '../assets/webpack-image.png';

//metodo esportable
export const saludar = (nombre) => {
    console.log('Creando etiqueta h1 en HTML');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}, como estás?`;

    document.body.append(h1);

    //Img:
    // console.log(webpacklogo);
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // dicument.body.append(img);
}