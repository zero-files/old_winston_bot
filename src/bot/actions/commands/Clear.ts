import { Message, TextChannel } from "discord.js";
import Command from "bot/commands/Command";

export default class Clear implements Command {
    public readonly name = "Clear";
    public readonly description = "Elimina tantos mensajes como se desee, excluyendo el mensaje del comando.";
    public readonly triggers = ["clear"];

    private delLimit = 100; 

    public async execute(message:Message):Promise<void>{
        if(!message.member?.permissions.has("MANAGE_MESSAGES")){
            message.channel.send("No tienes permiso para usar este comando.");
            return;
        }

        const msgContent = message.content;
        const memberToFilter = message.mentions.members?.first();
        const msgNum = parseInt(msgContent[0], 10);

        //parseInt() devuelve NaN si no puede parsear el contenido, y cualquier operación lógica devuelve false (menos 'NaN || true')
        if(msgNum > 0){
            if(msgNum > this.delLimit){
                message.channel.send(`No se pueden eliminar más de ${this.delLimit} mensajes a la vez`)
                return;
            }
            
            let msgsToDel = await message.channel.messages.fetch({limit: msgNum, before: message.id})
            .then(msgCol => msgCol
                .filter(msg => memberToFilter ? (msg.member === memberToFilter) : true)
            );
            msgsToDel.delete(message.id)
            
            if(msgsToDel.size === 0){
                message.channel.send(`No se han encontrado mensajes de ${memberToFilter?.displayName} en `
                                    +`los últimos ${msgNum} mensajes o has mencionado un usuario no válido.`);
                return;
            }

            (<TextChannel>message.channel).bulkDelete(msgsToDel)
            .then(() => {
                message.channel.send("Borrado con éxito")
                .then(msg => {
                    setTimeout(() =>  {
                        msg.delete(), 10000;
                    });
                });
            })
            .catch(e => {
                message.channel.send("No se han podido eliminar los mensajes")
                .then(msg => setTimeout(() =>  msg.delete(),10000));
                console.error(e);
            });
            return;
        }

        if(msgContent[0] === "setlimit"){
            if(parseInt(msgContent[1], 10) < 1000){
                this.delLimit = parseInt(msgContent[1], 10);
                message.channel.send("Límite actualizado con éxito.");
                return;
            }
            message.channel.send("No ha introducido un nuevo límite válido.");
            return;
        }

        message.channel.send("No has introducido un número válido.");
    }
}
