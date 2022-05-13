const loadTablesFlg = false;
const composeSummaryFlg = true;

const abi = {
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
};

const token_contract_address = "0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172";

const crabadas_breeding_fee_address = '0x4e57a39cac2499abeafd3698f7164ecbfde008ee';
const zero_x_zero_address = "0x0000000000000000000000000000000000000000";

const inflation_filter = { "eq": ["from", zero_x_zero_address] };
const burn_filter = {
    "or": [
        { "eq": ["to", zero_x_zero_address] },
        { "eq": ["to", crabadas_breeding_fee_address] }
    ]
};

const inflation_table = "TUSInflationEvents";
const burn_table = "TUSBurnEvents";

const options = {
    "chainId": "0xa86a",
    "address": token_contract_address,
    "topic": "Transfer(address, address, uint256)",
    "abi": abi,
    "limit": 10000000,
    "sync_historical": true
};

const contractEventsOptions = [
    {
        "description": "Inflation Events",
        "tableName": inflation_table,
        // "filter": inflation_filter,
        ...options
    },
    {
        "description": "Burn Events",
        "tableName": burn_table,
        // "filter": burn_filter,
        ...options
    }
]

const exclude_from_burn_rate_if_sent_to_0x0_address = new Set([
    '0xb5a0ffe202e9223dce018c4fdc9e6b952fac4a2c',
    '0x4e57a39cac2499abeafd3698f7164ecbfde008ee'
])

module.exports = {
    abi,
    token_contract_address,
    options,
    contractEventsOptions,
    crabadas_breeding_fee_address,
    zero_x_zero_address,
    inflation_filter,
    burn_filter,
    loadTablesFlg,
    composeSummaryFlg,
    inflation_table,
    burn_table,
    exclude_from_burn_rate_if_sent_to_0x0_address
}