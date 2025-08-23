/*
Consigna:
- Crear un gestor de notas en Node.js con el que el usuario pueda interactuar desde la terminal
- Funciones: agregar(titulo y contenido), listar, eliminar
- Guardar datos en JSON
- Practicar módulos, Git(ramas), asincronia
*/

//desestructuracion de objetos
const { Resolver } = require('dns');
const {AgregarNota, LeeryConvertir} = require('./notas.js');
const readline = require("readline");

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
        console.log("\n--- Gestor de notas ---");
        console.log("1. Agregar nota");
        console.log("2. salir");

        let opcion = await preguntar("ingresa un numero para seleccionar la opcion")

        switch(opcion){
            case "1":
                const titulo = await preguntar("ingrese el titulo de la nota");
                const contenido = await preguntar("ingrese el contenido de " + titulo);
                await AgregarNota(titulo, contenido);
                break;
            case "2":
                salir = true;
                break;
        }
        rl.close(); //Detiene la escucha del teclado y permite que la app termine correctamente
    }
}