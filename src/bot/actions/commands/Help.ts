import { Message, MessageEmbed} from "discord.js";
import Command from "bot/commands/Command";
import Commands from "bot/actions/Commands";

export default class Help implements Command {
    public readonly name = "Help";
    public readonly description = "Muestra ";
    public readonly triggers = ["help"];

    private embed:MessageEmbed;

    constructor(commands:Commands){
        this.embed = new MessageEmbed();
        const fieldData: Array<{name:string, value:string}> = [];

        for(const command of commands.get_all()) {
            fieldData.push({name: command.name, value: command.description});
        }

        this.embed.setTitle("Comandos")
            .setDescription("Esta es una lista de los comandos actualmente habilitados:")
            .addFields(fieldData);
    }

    public async execute(message:Message):Promise<void> {
        message.channel.send({embeds: [this.embed]});
    }
}
