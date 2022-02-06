import { Message } from "discord.js";
import Command from "bot/commands/Command";

export default class Ping implements Command {
    public readonly name = "Ping";
    public readonly description = "Mide la latencia entre el usuario y el bot.";
    public readonly triggers = ["ping"];

    public async execute(message: Message):Promise<void> {
        message.channel.send("`Pinging...`")
            .then(sent => {
                sent.edit(`Pong! (${sent.createdTimestamp - message.createdTimestamp}ms)`);
            });
    }

}
