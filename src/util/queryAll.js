const { Moralis } = require('../moralis');

const queryAll = async (tableName) => {

    const query = new Moralis.Query(tableName);
    query.limit(100000000000);

    const execute = async () => {
        return await query.find();
    }
    
    return await execute();
}

module.exports = { queryAll };