# Contributing

Antes de contribuir en este repositorio, por favor
 * lee el [README.md](https://github.com/zero-files/winston_bot/blob/main/README.md),
 * lee nuestro [CODE_OF_CONDUCT.md](https://github.com/zero-files/winston_bot/blob/main/CODE_OF_CONDUCT.md),
 * visita nuestros [issues](https://github.com/zero-files/winston_bot/issues),
 * considera formar parte de la discusión en [Discord](https://discord.gg/vSETxB2),
 * si es tu primera vez, lee un resumen de cómo contribuir: [Contribuir por primera vez en Github](https://gist.github.com/zero-files/31e73d0573142d0573eb58d69a5158fd)
 * termina de leer este archivo. 

Crea un issue planteando el problema a resolver y espera una respuesta. </br>
Sé amable en la discusión y permite que los desarrolladores principales ofrezcan su ayuda para resolver los problemas.</br>
Siéntete libre de crear cualquier issue que tengas en mente. Todas las ideas son bienvenidas, pero asegúrate que ésta no haya sido planteada con anterioridad.

### Tutorial rápido, alpha 0.0.1

Necesitas node 16.x porque la librería de discord.js así lo pide. </br>
Ejecuta `npm i`</br>
Crea el archivo `.env`, revisá el archivo `src/utils/Env.ts` para conocer las variables de entorno.</br> 
En desarrollo ejecuta `npm run dev` para iniciar el programa</br>
Una vez realizado los cambios, corre `npm run start:local` para correr el programa en local. 

Crea un archivo en la carpeta `src/bot/actions/commands`.</br>
Exporta por default la clase con el mismo nombre del archivo, importa la interface `Command` from `"bot/commands/Command"`</br>
Implementa la interface.</br>
Developea el comando todo apiñado en el mismo archivo (excusa alpha), después arreglo la arquitecutra.</br>
Importa la clase en el archivo `Main.ts`.</br>
En el método static `command_setup`, crea la instancia del comando y pasasela al command_map. 

#### Ejemplo
`Ping.ts`
```ts
import Command from "bot/commands/Command";

export default class Ping implements Command {
    public readonly name = "Ping";
    public readonly description = "Mide la latencia entre el usuario y el bot.";
    public readonly triggers = ["ping"];

    public async execute(message: Message):Promise<void> {
        //implementación del comando.
    }
}
``` 

`Main.ts`
```ts
//...
import Ping from "bot/commands/Ping";

class Main {
    private static commands_setup():Commands {
        const commands = new Commands();

        commands.add(new Ping());

        return commands;
    //...
//...
```
### Roadmap: 
Arreglar la arquitectura, basada en controllador, servicios, repositorios y entidades, tipica de REST.</br>
Volver a poner los comandos del Winston anterior a esta nueva versión. </br>
Arreglar el setup del programa en el archivo Main.ts </br>
Levantar la base de datos en firebase.
