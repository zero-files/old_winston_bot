import { Message } from "discord.js";
import Command from "bot/commands/Command";
import StrFun from "utils/StrFun";
import RandomFuns from "utils/RandomFuns";

export default class Choose implements Command {
    public readonly name = "Choose";
    public readonly description = "Elige entre las diferentes opciones entre ' o '. Si hay menos de dos opciones, da cara o cruz.";
    public readonly triggers = ["choose", "ch"];

    private coin:string[] = ["Cara", "Cruz"];
    private answers:string[] = [
        "La verdad te sugiero",
        "Lo correcto es",
        "Lo mejor sería",
        "Sin lugar a dudas",
        "Definitivamente"];

    public async execute(message: Message):Promise<void> {
        const opts:string[] = StrFun.strip(message.content).join(" ").split(" o ");
        const rndNum:number = RandomFuns.randomFloat();

        if(opts.length < 2) {
            message.channel.send(`Ha salido: **${this.coin[Math.floor(rndNum * 2)]}**`);
        }
        else {
            const rndAns:string = this.answers[Math.floor(RandomFuns.randomFloat() * this.answers.length)];

            message.channel.send(rndAns + ` *${opts[Math.floor(rndNum * opts.length)]}*.`);
        }
    }

}
