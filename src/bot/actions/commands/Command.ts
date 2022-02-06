import { Message } from "discord.js";

export default interface Command {
    readonly name: string;
    readonly description: string;
    readonly triggers: string[];
    execute: (message: Message) => Promise<void>;
}
