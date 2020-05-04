const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");


const client = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

//TODO: Criar require de Logger dentro da pasta modules

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      const eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

client.commands = new Enmap();

fs.readdir("./commands/", (err, files, tools) => {
    
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});


client.login(config.token);