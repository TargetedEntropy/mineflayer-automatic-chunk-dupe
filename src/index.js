const fs = require("fs");
const path = require("path");
const mineflayer = require("mineflayer");
const config = require('./config.json')

const OPTIONS = {
  host: '${config.server}',
  port: 25565,
  username: `${config.email}`,
  auth: 'microsoft',
  version: '1.12.2'
};

function injectModules(bot) {
  const MODULES_DIRECTORY = path.join(__dirname, "modules");
  const modules = fs
    .readdirSync(MODULES_DIRECTORY)
    .filter((x) => x.endsWith(".js"))
    .map((pluginName) => require(path.join(MODULES_DIRECTORY, pluginName)));

  bot.loadPlugins(modules);
}

function initBot() {
  const bot = mineflayer.createBot(OPTIONS);
  injectModules(bot);

  bot.on("end", function () {
    setTimeout(() => {
      initBot();
    }, 10 * 1000);
  });
}

initBot();
