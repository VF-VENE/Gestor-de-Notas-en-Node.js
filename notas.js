const { error } = require('console');
const fs = require('fs').promises;
module.exports = {AgregarNota, LeeryConvertir};

/*
flujo de pensamiento para cada funcionalidad que interactúe con notas.json
1. Leer notas.json como texto
2. Convertir texto a array JS para manipularlo.
3. ejecutar la funcionalidad correspondiente
4. convertir y Guardar array actualizado en notas.json
*/

async function LeeryConvertir(){
    try{
        const datajson = await fs.readFile('notas.json', 'utf-8');
        return JSON.parse(datajson);
    } catch(error){
        console.error("Error leyendo o parseando notas.json:", error);
        return [];
    }
}

async function ConvertirYGuardar(arrayNota){
    try{
        const notajson = JSON.stringify(arrayNota, null, 2);
        await fs.writeFile('notas.json', notajson, 'utf-8');
    } catch(error){
        console.log("error al guardar: " + error);
    }
}

async function AgregarNota(titulo, contenido){
    const notas = await LeeryConvertir();
    const nuevaNota = {titulo, contenido}; //shorthand. es lo mismo que tiulo: titulo.
    notas.push(nuevaNota) //ahora el array notas toma un nuevo valor
    await ConvertirYGuardar(notas);
    console.log("nota guardada correctamente");
}
