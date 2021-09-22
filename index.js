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

    // const deposit1 = await Account.depositMoneybyId(conn, 2, 'balance', 20);
    // console.log(deposit1);
    // console.log('');

}
app.init();

module.exports = app;