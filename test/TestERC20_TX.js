const ERC20_TX = artifacts.require("ERC20_TX");

contract('ERC20_TX', async (accounts) => {
    describe('RC20 Tests', function() {
        const tokens = 100000;
        const tokenwithdecimals = 100000000000000000000000 // 18 decimals
        it('should call a function that get balance of an addess', async() => {
            let instance = await ERC20_TX.deployed();
            let bal = await instance.balanceOf(accounts[0]);
            assert.equal(bal.toString(), tokenwithdecimals);
        });
    });
    describe('IMARKET TESTS', function() {

        const partition_1 = web3.utils.fromAscii("buy");
        const partition_2 = web3.utils.fromAscii("sell");
        const trade_number = 1;
        const created_on = "2010-01-12";
        const account_cap_risque = "test";
        const account_cap_state = "test";
        const account_class = "test";

        it('should call a function that store partition_1(buy) Imarket data on blockchain', async() => {
            let instance = await ERC20_TX.deployed();
            let txid = instance.setMarket(partition_1, trade_number, created_on, account_cap_risque, account_cap_state, account_class);
            assert.notEqual(txid, null)
        });
        it('should call a function that store partition_2(sell) Imarket data on blockchain', async() => {
            let instance = await ERC20_TX.deployed();
            let txid = instance.setMarket(partition_2, trade_number, created_on, account_cap_risque, account_cap_state, account_class);
            assert.notEqual(txid, null)
        });
        it('should call a function that get length of partition_1(buy) Imarket data on blockchain', async() => {
            let instance = await ERC20_TX.deployed();
            let count = await instance.getMarketCount(partition_1);
            assert.equal(count, 1)
        });
        it('should call a function that get length of partition_2(sell) Imarket data on blockchain', async() => {
            let instance = await ERC20_TX.deployed();
            let count = await instance.getMarketCount(partition_2);
            console.log(count)
            assert.equal(count, 1)
        });
      });
});