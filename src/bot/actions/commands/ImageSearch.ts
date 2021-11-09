import { Message } from "discord.js";
import Command from "bot/commands/Command";
import StrFun from "utils/StrFun";
import axios from "axios";
import RandomFuns from "utils/RandomFuns";

export default class ImageSearch implements Command {
    public readonly name = "Image";
    public readonly description = "Buscador de imágenes en google.";
    public readonly triggers = ["img", "image"];

    private responses:string[] = [
        "No creo poder encontrar lo que pedides.",
        "No, creo que no hay nada de eso.",
        "Qué imagen más específica pedís.",
        "Pides cosas que no puedo encontrar.",
        "Hmmm creo que solo hay paigeeworlds como resultado."
    ];
    private banned_urls:Set<string> = new Set(["lookaside.fbsbx.com", "i.paigeeworld.com", "i.ytimg.com", "cloudfront.net", "www.movistarplus.es"]);
    private API_KEY:string;
    private ENGINE_ID:string;

    constructor(api_key:string, engine_id:string) {
        this.API_KEY = api_key;
        this.ENGINE_ID = engine_id;
    }

    private filter_banned_urls(images:any[]) {
        return images.filter(image => {
            return !(this.banned_urls.has(image.displayLink));
        });
    }

    public async execute(message: Message):Promise<void> {
        const query = StrFun.strip(message.content).join(" ");
        if(query) {
            axios.get( `https://www.googleapis.com/customsearch/v1?key=${this.API_KEY}&searchType=image&cx=${this.ENGINE_ID}&q=${query}` )
                .then(response => {
                    let images = response.data.items; // ARRAY
                    images = this.filter_banned_urls(images);

                    if(images.length === 0) {
                        message.channel.send(`No encontré nada para \`${query}\` en internet.`);
                    } else {
                        const random_index = Math.floor((Math.random() * images.length) + 1);
                        const image_selected = images[random_index].link;
                        message.channel.send({files:[image_selected]}).catch(() =>
                            message.channel.send("El enlace obtenido está roto.")
                        );
                    }
                })
                .catch(() => {
                    const response = this.responses[Math.floor(this.responses.length * RandomFuns.randomFloat())];
                    message.channel.send(response);
                });
        }
        else message.channel.send("¿Qué imagen deseas que busque?");
    }

}
