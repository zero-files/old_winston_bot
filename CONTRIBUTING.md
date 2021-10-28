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

## Tutorial rápido, alpha 0.0.1

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

### Ejemplo
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

## Database
Es una base de datos en firebase, dentro del paqutede `database/` hay una clase llamada `FirebaseDatabase`, es un singleton (perdon). </br>
El paquete tiene también una interface llamada `Repository`, utiliza el repositorio para extender tus clases repositorio (ver abajo).</br>
Para esto es sencillo, es necesario entender el [patrón repository](https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e) </br>

Crea una entidad para los datos que te interese guardar en la base de datos. </br>
Crea una clase que implemente a `Repository` para manejar esa entidad. <br>
La clase repository debe recibir una instancia de la base de datos por constructor.</br>
Usala.<br>

`Banana.ts`
```ts
class Banana {
    public id:string;
    public color:string;
    public size:number;
    public lote:number;

    constructor(id:string, color:string, size:number, lote:number){
        this.id = id;
        this.color = color;
        this.size = size;
        this.lote = lote;
    }
}
```

`BananasRepository.ts`
```ts
import Repository from "database/Repository"
import Banana from "./Banana";

class BananasRepository implements Repository<Banana> {
    constructor()

    public get_all():Promise<Banana[]> {
        //obtener todas las bananas de la base de datos 
    }

    public get(id:string):Promise<Banana|null> {
        //obtener una banana de la base de datos
    }

    public create(entity:Banana):Promise<void> {
        //guardar una banana en la base de datos
    }

    public update(entity:Banana):Promise<void> {
        //actualizar una banana
    }

    public delete(id:string):Promise<void> {
        //eliminar una banana
    }
}
```

Para utilziarlo, acordate de hacerlo mediante inyección de dependencias, dependiendo de la interface y no de la clase concreta.

`Foo.ts`
```ts
import Repository from "database/Repository";
import Banana from "../foo/bar/Banana.ts"

//...
    private bananas_repository:Repository<Banana>;

    constructor(bananas_repository:Repository<Banana>){
        this.bananas_repository = bananas_repository;
    }

    public action():void{
        this.bananas_repository.create(new Banana(...));
    }
    
    //...
```
Inyecta las dependencias

`Main.ts` 
```ts
//Obtené la instancia de la base de datos de firebase
const database = FirebaseDatabase.instance();

//Crea tu repository de bananas
const bananas_repository = new BananasRepository(database);

//Crea la instancia de tu clase usadora de repositories de bananas
const foo = new Foo(bananas_repository);
```

## Roadmap: 
Arreglar la arquitectura, basada en controllador, servicios, repositorios y entidades, tipica de REST.</br>
Volver a poner los comandos del Winston anterior a esta nueva versión. </br>
Arreglar el setup del programa en el archivo Main.ts </br>
Levantar la base de datos en firebase.
