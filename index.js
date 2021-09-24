const db = require('./db');
const User = require('./User');
const Account = require('./Account');


const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'bank',
    });

    //USERS
    console.log('');
    const user1 = await User.create(conn, 'Jonas', 'Balionas');
    console.log(user1);
    const user2 = await User.create(conn, 'Tomas', 'Naujokas');
    console.log(user2);
    const user3 = await User.create(conn, 'Linas', 'Varnas')
    console.log(user3);
    const user4 = await User.create(conn, 'Dina', 'Naujokiene')
    console.log(user4);
    console.log('');

    const userList = await User.allList(conn);
    console.log(userList);
    console.log('');

    const userById = await User.findById(conn, 2);
    console.log(userById);
    console.log('');


    //ACCOUNTS
    //jei spausdiname teksta account.js loginti dar karta nereikia
    //const account1 = await Account.create(conn, 1, 'EUR');
    //console.log(account1);
    //const account2 = await Account.create(conn, 2, 'EUR');
    //console.log(account2);
    //const account3 = await Account.create(conn, 3, 'EUR');
    //console.log(account3);
    //const account4 = await Account.create(conn, 4, 'EUR');
    //console.log(account4);

    const deposit1 = await Account.depositMoneybyId(conn, 2, 20);
    console.log(deposit1);
    const deposit2 = await Account.depositMoneybyId(conn, 1, 100);
    console.log(deposit2);
    const deposit3 = await Account.depositMoneybyId(conn, 3, 15);
    console.log(deposit3);
    const deposit4 = await Account.depositMoneybyId(conn, 4, 25);
    console.log(deposit4);
    const deposit5 = await Account.depositMoneybyId(conn, 2, 20);
    console.log(deposit5);
    console.log('');

    const withdraw1 = await Account.withdrawMoneybyId(conn, 1, 50);
    console.log(withdraw1);
    const withdraw2 = await Account.withdrawMoneybyId(conn, 3, 10);
    console.log(withdraw2);
    const withdraw3 = await Account.withdrawMoneybyId(conn, 3, 15);
    console.log(withdraw3);
    console.log('');

    const balance1 = await Account.balance(conn, 3);
    console.log(balance1);
    const balance2 = await Account.balance(conn, 4);
    console.log(balance2);
    console.log('');

    const transfer1 = await Account.transferMoney(conn, 1, 4, 10);
    console.log(transfer1);

}
app.init();

module.exports = app;