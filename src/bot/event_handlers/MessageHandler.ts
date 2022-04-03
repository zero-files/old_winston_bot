import { ClientEvents, Message } from "discord.js";
import EventHandler from "bot/eventhandlers/EventHandler";
import Commands from "bot/actions/Commands";
import Env from "utils/Env";

export default class MessageCreated implements EventHandler {
    public event:keyof ClientEvents = "messageCreate";
    private commands:Commands;

    constructor(commands:Commands) {
        this.commands = commands;
    }

    public async handle(message:Message):Promise<void> {
        if(message.author.bot) return;
        if(message.content[0] != Env.COMMAND_PREFIX) return;

        const command_attempt = message.content.replace(new RegExp("/"+Env.COMMAND_PREFIX+"\\s*/"), "").split(" ")[0].toLowerCase();

        const action = this.commands.match(command_attempt);
        void action?.execute(message)
            .catch(() => void message.channel.send("An error occurred while executing the command."));
    }
}
