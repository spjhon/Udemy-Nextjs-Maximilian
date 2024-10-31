'use client';

import { useRef, useState, ChangeEvent } from 'react';

import classes from './image-picker.module.css';
import Image from 'next/image';
interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {

  /**Referencia Directa a un Elemento del DOM: useRef crea un "objeto de referencia" que puede apuntar 
   * directamente a un elemento del DOM, como un <input>, sin provocar que el componente se vuelva a renderizar cuando 
   * cambia esa referencia. Esto es útil cuando necesitas manipular un elemento en el DOM sin interferir con el flujo de 
   * renderizado de React. */

  /**Ejemplo en este contexto:

En el caso de tu componente, useRef se usa para crear una referencia llamada imageInput, que apunta al elemento <input type="file">.
Luego, puedes usar esa referencia para "decirle" a React que ejecute .click() en ese <input> cuando el usuario haga clic en el 
botón "Pick an Image". */
  const imageInput = useRef<HTMLInputElement>(null);


  /*El usestate es para cambiar el stado del componente una vez se cargue una nueva imagen, lo que se hace
  es hacer guardar el valor extraido del evento y guardarlo en una constante llamada file
  luego con una propiedad del navegador que sellama FileReader se transforma el archivo en un string que sirve de fuente
  src para la imagen del preview*/
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }


  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {

    /**Tipo de dato: file es una instancia de File, que es un objeto proporcionado por el navegador 
     * que representa un archivo en el sistema del usuario. Este objeto contiene varios atributos y métodos 
     * que permiten interactuar con el archivo, pero no es una cadena de texto. */

    /**Atributos del objeto File
     * 
Algunos de los atributos más comunes que puedes encontrar en el objeto File son:

name: El nombre del archivo, incluyendo la extensión.
size: El tamaño del archivo en bytes.
type: El tipo MIME del archivo (por ejemplo, "image/jpeg" para una imagen JPEG).
lastModified: La fecha y hora de la última modificación del archivo. */


    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

/**Al llamar a este método y pasarle el archivo (file), FileReader empieza a procesar el archivo especificado. Internamente, 
 * FileReader utiliza la información del archivo para leer su contenido.
Este método hace que FileReader lea el archivo y, una vez que ha terminado, se genera el evento load.

Evento onload:
Cuando la lectura del archivo se completa, se dispara el evento load, y la función que has definido para manejar este evento (asignada a fileReader.onload) se ejecuta */


fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    
  }


  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>

      <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>

        {/**A este input se le agregan clases que lo que hacen es ocultar el input que esta por default */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />

        {/**Este boton reemplaza al input button escondido mas arriba y se utiliza un onclick para poder activar
         * el input, para eso se utiliza el useRef
         */}

        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
