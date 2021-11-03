import { Message } from "discord.js";
import Command from "bot/commands/Command";
import seed from "seed-random";

export default class EightBall implements Command {
    readonly name = "8ball";
    readonly description = "Envia una respuesta al azar a una pregunta.";
    readonly triggers = ["8ball"];

    private responses:string[] = [
        "Y... Yo creo que sí.",
        "Es cierto.",
        "Sin lugar a dudas xd",
        "Sí.",
        "Dalo por hecho.",

        "Si te lo digo no me vas a creer.",
        "Si te digo lo que pasará, no ocurrirá.",
        "Según mis cálculos... Los cálculos no dicen nada.",
        "Ni lo confirmo ni lo desmiento.",
        "Es complicado...",

        "No.",
        "No lo creo.",
        "Mi IA dice que no es así.",
        "No cuentes con ello.",
        "Claro que no.",

        "Búscate la respuesta tú mismo."
    ];

    public async execute(message:Message):Promise<void> {
        const sentence = message.content.split(" ").splice(1).join(" ").toLowerCase();

        if(!sentence) {
            message.channel.send("Hazme una pregunta primero.");
        } else {
            const response = this.responses[Math.floor(seed(sentence)() * this.responses.length)];
            message.channel.send(response);
        }
    }
}
