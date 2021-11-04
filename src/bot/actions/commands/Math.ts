import { Message } from "discord.js";
import Command from "bot/commands/Command";
import {evaluate} from "mathjs";
import StrFun from "utils/StrFun";

export default class Math implements Command {
    public readonly name = "Math";
    public readonly description = "Evalúa la expresión matemática introducida.";
    public readonly triggers = ["math"];

    public async execute(message: Message):Promise<void> {
        const formula = StrFun.strip(message.content).join("");

        if(!formula) {
            message.channel.send("No has introducido ninguna expresión");
        } else {
            let result:unknown;
            try {
                result = evaluate(formula);
            } catch {
                message.channel.send("No creo que pueda calcular eso.");
                return;
            }

            message.channel.send(`El resultado es ${result}`);
        }
    }

}
