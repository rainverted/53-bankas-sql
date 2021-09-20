const db = require('./db');
const Author = require('./Users');
const Books = require('./Accounts');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'bank',
    });
}

app.init();

module.exports = app;