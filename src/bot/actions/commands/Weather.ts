import { Message } from "discord.js";
import Command from "bot/commands/Command";
import axios from "axios";
import StrFun from "utils/StrFun";

export default class Weather implements Command {
    public readonly name = "Weather";
    public readonly description = "Muestra el tiempo en cualquier lugar del mundo.";
    public readonly triggers = ["weather", "wtr"];

    private API_KEY:string;

    constructor(api_key:string){
        this.API_KEY = api_key;
    }

    private __replaceIcon(icon:string):string {
        switch(icon){
            case "01d":
            case "01n":
                return ":sunny";
            case "02d":
            case "02n":
                return ":partly_sunny";
            case "03d":
            case "03n":
                return ":white_sun_cloud";
            case "04d":
            case "04n":
                return ":cloud";
            case "09d":
            case "09n":
                return ":cloud_rain";
            case "10d":
            case "10n":
                return ":white_sun_rain_cloud";
            case "11d":
            case "11n":
                return ":cloud_lightning";
            case "13d":
            case "13n":
                return ":snowflake";
            case "50d":
            case "50n":
                return ":fog";
        }
        return ":desgracia:";
    }

    public async execute(message: Message):Promise<void> {
        const wws = StrFun.normalize( StrFun.strip(message.content).join( " " ) );
        const splts = wws.split( "," );
        let country: string | null = null;
        let city: string | null = null;
        if( splts.length >= 2 )
        {
            city = StrFun.normalize(splts[ 0 ].trim( ));
            country = "," + splts[ 1 ];
        }
        else
        {
            city = StrFun.normalize(wws.trim( ));
            country = "";
        }
        if(!city) {
            message.channel.send("Indica el nombre de la ciudad.");
        } else {
            axios.get(  `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=es&units=metric&appid=${this.API_KEY}` )
                .then(response => {
                    const data = response.data;

                    if(data["cod"] == 200 ) {
                        const icon = this.__replaceIcon( data["weather"][0]["icon"] );

                        const description = StrFun.capitalize( data["weather"][0]["description"] );
                        const temp = data["main"]["temp"];
                        const temp_min = data["main"]["temp_min"];
                        const temp_max = data["main"]["temp_max"];
                        message.channel.send(`> ${icon}: En *${data.name}* (${data.sys.country}) hay __${description}__ con una temperatura de ${temp}°C sobre (${temp_min}°C, ${temp_max}°C)`);
                    } else {
                        message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                    }
                })
                .catch(e => {
                    if(e.response.data["cod"] == 404){
                        message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                        return;
                    }
                    message.channel.send("No puedo consultar el tiempo en este momento...");
                    console.error(e);
                });
        }
    }

}
