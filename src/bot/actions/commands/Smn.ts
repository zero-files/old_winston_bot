import { Message } from "discord.js";
import Command from "bot/commands/Command";
import axios from "axios";
import StrFun from "utils/StrFun";

export default class Smn implements Command {
    public readonly name = "SMN";
    public readonly description = "Mide la latencia entre el usuario y el bot.";
    public readonly triggers = ["smn"];
    private query_attempts = 0;


    public async execute(message: Message):Promise<void> {
        const city = StrFun.strip(message.content).join(" ").toLowerCase();

        if(!city){
            message.channel.send("Indica el nombre de la ciudad.");
        } else {
            axios.get("https://ws.smn.gob.ar/map_items/weather")
                .then(response => {
                    const cities = JSON.parse(JSON.stringify(response.data, ["name", "province", "weather", "temp", "st"]));
                    const city_weather = cities.find(wthr_city => {
                        return (StrFun.normalize(wthr_city.name).toLowerCase() === StrFun.normalize(city));
                    });

                    if(city_weather) {
                        message.channel.send(`En ${city_weather.name} (${city_weather.province}), hace ${city_weather.weather.st || city_weather.weather.temp}°C`);
                        this.query_attempts = 0;

                    }
                    else {
                        this.query_attempts++;
                        if(this.query_attempts === 5) {
                            this.query_attempts = 0;
                            message.channel.send("Por favor, solo ciudades argentinas.");

                        }
                        else {
                            message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                        }
                    }
                })
                .catch(e => {
                    message.channel.send("No puedo consultar el tiempo en este momento...");
                    console.error(e);
                });
        }
    }

}
