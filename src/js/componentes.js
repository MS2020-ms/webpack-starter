//importar .css
import '../css/componentes.css'

//metodo esportable
export const saludar = (nombre) => {
    console.log('Creando etiqueta h1 en HTML');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}, como estás?`;
    document.body.append(h1);
}