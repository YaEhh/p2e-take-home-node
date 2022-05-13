const { queryAll } = require('./queryAll.js')
const { Moralis } = require('../moralis');
const {
    inflation_table,
    burn_table,
    zero_x_zero_address,
    exclude_from_burn_rate_if_sent_to_0x0_address } = require('../config/config')

const composeDailySummary = async () => {
    const summary = {};
    const inflationResults = await queryAll(inflation_table);
    const burnResults = await queryAll(burn_table);

    indexInflationEvents(summary, inflationResults);
    indexBurnEvents(summary, burnResults)

    for (const [key, value] of Object.entries(summary)) {
        console.log(`Date: ${key}: Mint: ${value.mint} | Burn: ${value.burn} | Net: ${value.net}`);
    }
}

const indexInflationEvents = async (summary, inflationEvents) => {
    for (let idx = 0; idx < inflationEvents.length; idx++) {
        const inflationEvent = inflationEvents[idx];
        const { block_timestamp, value } = inflationEvent.attributes;

        const dateFromIso = new Date(block_timestamp);

        const compositeKey =
            dateFromIso.getFullYear() + ':' +
            dateFromIso.getMonth() + ':' +
            dateFromIso.getDate();

        if (compositeKey in summary) {
            let dailySummary = summary[compositeKey];
            const valueInTus = parseInt(Moralis.Units.FromWei(value, 18))
            dailySummary.mint += valueInTus;
            dailySummary.net += valueInTus;
        } else {
            const valueInTus = parseInt(Moralis.Units.FromWei(value, 18))
            const newDailySummary = { mint: valueInTus, burn: 0, net: valueInTus };
            summary[compositeKey] = newDailySummary;
        }
    }
}

const indexBurnEvents = async (summary, burnEvents) => {
    for (let idx = 0; idx < burnEvents.length; idx++) {
        const burnEvent = burnEvents[idx];
        const { block_timestamp, value, to, from } = burnEvent.attributes;

        const dateFromIso = new Date(block_timestamp);

        const compositeKey =
            dateFromIso.getFullYear() + ':' +
            dateFromIso.getMonth() + ':' +
            dateFromIso.getDate();

        if ((to === zero_x_zero_address &&
            (exclude_from_burn_rate_if_sent_to_0x0_address.has(from))))
            continue;

        if (compositeKey in summary) {
            let dailySummary = summary[compositeKey];
            const valueInTus = parseInt(Moralis.Units.FromWei(value, 18))
            dailySummary.burn += valueInTus;
            dailySummary.net -= valueInTus;
        } else {
            const valueInTus = parseInt(Moralis.Units.FromWei(value, 18))
            const newDailySummary = { mint: 0, burn: valueInTus, net: -valueInTus };
            summary[compositeKey] = newDailySummary;
        }
    }
}

module.exports = {
    composeDailySummary
};