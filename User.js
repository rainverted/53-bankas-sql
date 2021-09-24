const Account = require('./Account');
const User = {};

/**
 * Sukuriamas banko vartotojas ir saskaita, kurios balansas lygus 0.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} userFirstname Vartotojo vardas
 * @param {string} userLastname Vartotojo pavarde
 * @returns {Promise<string>} Tekstas, kuris nurodo kliento pilna varda
 */
User.create = async (connection, userFirstname, userLastname) => {
    const sql = 'INSERT INTO `users` \
                    (`id`, `firstname`, `lastname`)\
                    VALUES (NULL, "' + userFirstname + '","' + userLastname + '")';
    const [rows] = await connection.execute(sql);
    const user_Id = rows.insertId;              //kintamasis, kuris sujungiamas su account.create metode duodamu ID
    const newAccount = await Account.create(connection, user_Id, 'EUR');
    return `Naujas banko vartotojas užregistruotas: ${userFirstname} ${userLastname}, ID - ${user_Id}. `;
}

/**
 * Visu vartotoju sarasas su sukurtomis saskaitomis
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks vartotojas ir sąsakaitos nr.
 */
User.allList = async (connection) => {
    const sql = 'SELECT `firstname`, `lastname`, `account_no`\
                FROM `users`\
                LEFT JOIN `accounts`\
                    ON `users`.`id` = `accounts`.`user_Id`';
    const [rows] = await connection.execute(sql);
    const list = [];
    let i = 0;
    for (const { firstname, lastname, account_no } of rows) {
        list.push(`${++i}) ${firstname} ${lastname} sąskaitos nr. ${account_no}.`);
    };
    const title = 'Visų vartotojų sąrašas:\n';
    return title + list.join('\n');
}

User.findById = async (connection, user_Id) => {
    const sql = 'SELECT *\
                FROM `users`\
                WHERE `id` = '+ user_Id;
    const [rows] = await connection.execute(sql);

    for (const { firstname, lastname } of rows) {
        if (rows.length === 0) {
        }
        return `Ieškomas vartotojas pagal ID ${user_Id} yra ${firstname} ${lastname}.`;
    }
}


module.exports = User;

