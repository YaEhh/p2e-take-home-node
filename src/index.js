const { Moralis } = require('./moralis');
const { composeDailySummary } = require('./util/composeDailySummary');

const {
    loadTablesFlg,
    contractEventsOptions,
    composeSummaryFlg
} = require("./config/config");


const fetchContractEvent = async (options) => {
    const result = await Moralis.Cloud.run("watchContractEvent", options, { useMasterKey: true });

    if (result.success) {
        console.log(`Loading table: ${options.tableName}`);
    } else {
        console.log(`Error occurred triggering ${options.description} load`);
    }
}


if (loadTablesFlg) contractEventsOptions.forEach(contractEvent => fetchContractEvent(contractEvent));
if (composeSummaryFlg) composeDailySummary();


