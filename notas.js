import { error } from 'console';
import { promises as fs } from 'fs';
import chalk from "chalk";

/*
flujo de pensamiento para cada funcionalidad que interactúe con notas.json
1. Leer notas.json como texto
2. Convertir texto a array JS para manipularlo.
3. ejecutar la funcionalidad correspondiente
4. convertir y Guardar array actualizado en notas.json
*/

async function LeeryConvertir() {
    try {
        const datajson = await fs.readFile('notas.json', 'utf-8');
        return JSON.parse(datajson);
    } catch(error) {
        console.error(chalk.red("Error leyendo o parseando notas.json:", error));
        return [];
    }
}

async function ConvertirYGuardar(arrayNota) {
    try {
        const notajson = JSON.stringify(arrayNota, null, 2);
        await fs.writeFile('notas.json', notajson, 'utf-8');
    } catch(error) {
        console.log(chalk.red("error al guardar: " + error));
    }
}

async function AgregarNota(titulo, contenido) {
    const notas = await LeeryConvertir();
    const nuevaNota = { titulo, contenido };
    notas.push(nuevaNota);
    await ConvertirYGuardar(notas);
    console.log(chalk.green("nota guardada correctamente"));
}

async function EliminarNota(titulo) {
    const notas = await LeeryConvertir();
    const notasEliminada = notas.filter(nota => nota.titulo !== titulo);
    if(notas.length === notasEliminada.length) {
        console.log(chalk.red("no se encontro la nota, vuelva a intentar"));
    } else {
        await ConvertirYGuardar(notasEliminada);
        console.log(chalk.green(titulo + " fue eliminada"));
    }
}

export { AgregarNota, LeeryConvertir, EliminarNota };
