const { Events, REST, Routes } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        const commands = client.commands.map(cmd => cmd.data.toJSON());

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // Use global commands for production, guild for dev
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

            console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    },
};
