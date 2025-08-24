/*
Consigna:
- Crear un gestor de notas en Node.js con el que el usuario pueda interactuar desde la terminal
- Funciones: agregar(titulo y contenido), listar, eliminar
- Guardar datos en JSON
- Practicar módulos, Git(ramas), asincronia
*/

//desestructuracion de objetos
import dns from 'dns';
const { Resolver } = dns;
import { AgregarNota, LeeryConvertir, EliminarNota } from './notas.js';
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({ //crear interfaz: forma que Node tiene de interactuar con la consola.
    input: process.stdin,
    output: process.stdout
});

// Función para preguntar, devolviendo una respuesta como promesa
function preguntar (pregunta){
    const respuesta =  new Promise((resolver) => rl.question(pregunta, resolver));
    return respuesta;
}

//crear main para usar async/await fácilmente
async function main(){
    let salir = false;

    while(!salir){
        console.log(chalk.blueBright("\n--- Gestor de notas ---"));
        console.log("1. Agregar nota");
        console.log("2. Eliminar una nota")
        console.log("3. salir");

        let opcion = await preguntar(chalk.yellow("ingresa un numero para seleccionar la opcion\n"))

        switch(opcion){
            case "1": {
                const titulo = await preguntar("ingrese el titulo de la nota\n");
                const contenido = await preguntar("ingrese el contenido de " + titulo + "\n");
                await AgregarNota(titulo, contenido);
                break;
            }
            case "2":{
                const tituloEliminar = await preguntar("ingrese el titulo de la nota que se desea eliminar\n");
                await EliminarNota(tituloEliminar);
                break;
            }
            case "3":{
                salir = true;
                break;
            }
        }
    }
    rl.close(); //Detiene la escucha del teclado y permite que la app termine correctamente
}

main(); //ejecutar main, que a su vez ejecuta todo lo demás. MUCHO MUY IMPORTANTE.