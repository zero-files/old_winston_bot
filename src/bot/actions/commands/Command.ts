import { Message } from "discord.js";

export default interface Command {
    name: string;
    description: string;
    triggers: string[];
    execute: (message: Message) => Promise<void>;
}
