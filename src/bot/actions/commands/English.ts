import { Message } from "discord.js";
import Command from "bot/commands/Command";
import axios from "axios";
import StrFun from "utils/StrFun";

export default class English implements Command {
    public readonly name = "English";
    public readonly description = "Busca el significado de una palabra en inglés.";
    public readonly triggers = ["english", "eng"];

    public async execute(message: Message):Promise<void> {
        const query = StrFun.strip(message.content)[0];
        if (query) {
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
                .then(res => {
                    let msgStr = "";
                    for(const meaning of res.data[0].meanings){
                        msgStr += `Word type: ${StrFun.capitalize(meaning.partOfSpeech)}\nMeanings:\n`;
                        for(const definition of meaning.definitions){
                            msgStr += `-${StrFun.capitalize(definition.definition)}\n`;
                        }
                        msgStr += "\n";
                    }
                    message.channel.send(msgStr);
                })
                .catch(e => {
                    if(e.response.status == 404) {
                        message.channel.send("No se ha encontrado la palabra que buscabas :^(");
                        return;
                    }
                    console.error(e);
                    message.channel.send("Ha ocurrido un error inesperado.");
                });
            return;
        }

        message.channel.send("Introduce una palabra a buscar.");
    }

}
