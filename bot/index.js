const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
const { glob } = require('glob');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

async function loadHandlers() {
    // Use relative pattern, assuming CWD is 'bot' folder
    const events = await glob('events/*.js');
    for (const file of events) {
        const filePath = path.resolve(file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    const commands = await glob('commands/*.js');
    for (const file of commands) {
        const filePath = path.resolve(file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }
}

loadHandlers();

client.login(process.env.DISCORD_TOKEN);
