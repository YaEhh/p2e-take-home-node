const Moralis = require("moralis/node");
const { serverUrl, appId, masterKey } = require("./config/moralis_server_config");


const initializeMoralis = async () => {
    await Moralis.start({ serverUrl, appId, masterKey });
}

initializeMoralis();

module.exports = {
    Moralis
}