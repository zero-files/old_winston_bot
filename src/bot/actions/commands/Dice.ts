import { Message } from "discord.js";
import Command from "bot/commands/Command";

export default class Dice implements Command {
    public readonly name = "Dice";
    public readonly description = "Arroja un número aleatorio según se indique.";
    public readonly triggers = ["dice"];

    public async execute(message: Message):Promise<void> {
        const msgContent = message.content.split(" ").splice(1).join(" ");
        let sides = Number(msgContent[0]);
        let times = Number(msgContent[1]);

        if(!sides || sides <= 0) sides = 6;
        if(!times) times = 1;

        if(times > 5) {
            message.channel.send("Solo puedes tirar cinco dados como máximo.");
            return;
        }

        const responses:string[] = [];

        for(let i = 0; i < times; i++) {
            responses.push(`> :game_die: **${Math.floor(Math.random() * sides) + 1}**`);
        }

        message.channel.send(responses.join("\n"));
    }
}
