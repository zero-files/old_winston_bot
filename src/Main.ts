// eslint-disable-next-line @typescript-eslint/no-var-requires
if(process.env.NODE_ENV === "development") require("dotenv").config();
import {Intents} from "discord.js";
import Env from "utils/Env";
import Bot from "bot/Bot";
import MessageHandler from "bot/eventhandlers/MessageHandler";
import ReadyHandler from "bot/eventhandlers/ReadyHandler";
import Commands from "bot/actions/Commands";
import Ping from "bot/commands/Ping";
import Clear from "bot/actions/commands/Clear";
import EightBall from "bot/actions/commands/EightBall";
import Dice from "bot/commands/Dice";
import Maths from "bot/commands/Maths";
import Weather from "bot/actions/commands/Weather";
import Smn from "bot/actions/commands/Smn";
import ImageSearch from "bot/actions/commands/ImageSearch";
import Choose from "bot/actions/commands/Choose";
import English from "bot/actions/commands/English";
import Help from "bot/actions/commands/Help";

class Main {
    private static commands_setup():Commands {
        const commands = new Commands();

        commands.add(new Ping())
            .add(new Clear())
            .add(new EightBall())
            .add(new Dice())
            .add(new Maths())
            .add(new Smn())
            .add(new English())
            .add(new Choose());
        try {
            commands.add(new Weather(Env.OWM_API_KEY));
        }
        catch(e) {
            console.error(e);
        }
        try {
            commands.add(new ImageSearch(Env.GOOGLE_API_KEY,Env.GOOGLE_ENGINE_ID));
        }
        catch(e) {
            console.error(e);
        }

        commands.add(new Help(commands));

        return commands;
    }

    private static bot_setup():Bot {
        const bot = new Bot({
            intents: [
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.GUILD_WEBHOOKS
            ]
        });
        const commands = this.commands_setup();

        bot.add_event_handler(new ReadyHandler())
            .add_event_handler(new MessageHandler(commands));

        return bot;
    }

    public static async main():Promise<void> {
        const bot_token = Env.BOT_TOKEN;

        const bot = this.bot_setup();
        await bot.start(bot_token);
    }
}

Main.main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
