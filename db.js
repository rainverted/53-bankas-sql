const mysql = require('mysql2/promise');

const db = {}

db.init = async ({ database, host, user }) => {
    const connection = await db.createDatabase({ database, host, user });

    await db.createTableUser(connection);
    await db.createTableAccount(connection);

    return connection;
}

db.createDatabase = async ({ database, host, user }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`DROP DATABASE IF EXISTS \`${database}\``);
        console.log('Buvusi duombaze istrinta');
    } catch (error) {
        console.log('Nera duombazes, kuria butu galima istrinti');
    }

    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await db.end();

        db = await mysql.createConnection({ host, user, database });
        console.log('Nauja duombaze sukurta');
        return db;
    } catch (error) {
        return error;
    }
}

db.createTableUser = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `users` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `firstname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        `lastname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        PRIMARY KEY(`id`)\
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti autoriu lenteles');
        console.log(error);
        return error;
    }
}

db.createTableAccount = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `accounts` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `user_Id` int(10) NOT NULL,\
                        `account_no` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        `currency` char(10) COLLATE utf8_swedish_ci NOT NULL,\
                        `balance` float(12,2) DEFAULT 0 NOT NULL,\
                        PRIMARY KEY(`id`)\
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti knygu lenteles');
        console.log(error);
        return error;
    }
}

module.exports = db;