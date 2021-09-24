const Account = {};

/**
 * Saskaitos sukurimas ir irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} user_Id Vartojaus ID
 * @param {string} currency Valiuta
 * @returns {Promise<string>} Tekstas, kuris nurodo saskaitos nr, vartotojo id ir valiuta
 */
Account.create = async (connection, user_Id, currency) => {
    //sukuriame kintamji funkcijai iskviesti ir nurodome reikiama reiksme
    const accountNumber = createAccNumber(18);
    const sql = 'INSERT INTO `accounts` \
                    (`id`, `user_Id`, `account_no`, `currency`, `balance`)\
                    VALUES (NULL, "' + user_Id + '","' + accountNumber + '" ,"' + currency + '", 0 )';
    const [rows] = await connection.execute(sql);
    //console.log(`Nauja banko sąskaita sukurta: ID - ${user_Id}, sąskaitos likutis 0 ${currency}, sk. nr. ${accountNumber}. `);
    return `ID ${user_Id} sąskaitos nr. - ${accountNumber}`;
}

/**
 * Sukuriamas atsitiktinis numeris is duoto skaiciaus kiekio
 * @param {number} length saskaitos numeriu sudaranciu skaiciu kiekis
 * @returns {string} saskaitos numeris
 */
function createAccNumber(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return 'LT' + result;
}

/**
 * Pinigu inesimas i nurodyta saskaita
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} user_id Vartotojo saskaitos ID
 * @param {number} amount pinigu suma
 * @returns {Promise<string>} tekstas, kuris nurodo, kad duota pinigu suma inesta i saskaita
 */
Account.depositMoneybyId = async (connection, user_Id, amount) => {
    const sql = 'UPDATE `accounts`\
                SET `balance`= `balance` + ' + amount + ' \
                WHERE `id` =' + user_Id;
    const [rows] = await connection.execute(sql);
    return `Į sąskaita įnešta pinigų suma: ${amount} EUR.`;
}


Account.withdrawMoneybyId = async (connection, user_Id, amount) => {
    //metodas balance reikalingas tam,kad negaletume nusiimti daugiau pinigu nei turima saskaitoje
    let balance = await Account.balance(connection, user_Id);
    if (amount > balance) {
        return `Sąskaitoje nėra pakankamai pinigų.`;
    }
    const sql = 'UPDATE `accounts`\
                 SET `balance` = `balance` - ' + amount + ' \
                 WHERE `id` = ' + user_Id;
    const [rows] = await connection.execute(sql);
    return `Iš sąskaitos išimta pinigų suma: ${amount} EUR.`;
}

/**
 * Pateikia esama saskaitos balansa
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} user_Id Vartotojo saskaitos ID
 * @returns {Promise<number>} Informacija apie saskaitos likuti
 */
Account.balance = async (connection, user_Id) => {
    const sql = 'SELECT * \
                FROM `accounts` \
                WHERE `id` = ' + user_Id;
    const [rows] = await connection.execute(sql);
    //return `ID ${user_Id} dabartinis balansas - rows[0].balance EUR.`;
    return rows[0].balance;
}

Account.transferMoney = async (connection, sender_account_id, receiver_account_id, amount) => {
    //pinigu pervedimas i kita saskaita
    let balance = await Account.balance(connection, sender_account_id);
    if (amount > balance) {
        return `Sąskaitoje nėra pakankamai pinigų.`;
    }
    const sendAmount = await Account.withdrawMoneybyId(connection, sender_account_id, amount);
    const receivedAmount = await Account.depositMoneybyId(connection, receiver_account_id, amount);
    return `Suma ${amount} EUR pervesta nurodytam vartotojui!`
}

// Account.delete = async (connection, account_id) => {
//     let accountStatus = await Account.isActive(connection, account_id);
//     if (!accountStatus) {
//         return "tranzakcija negalima, saskaita neegzistuoja";
//     }

//     let balance = await Account.balance(connection, account_id);
//     if (balance !== 0) {
//         return "atleisk, bet negalima i trint kai tiek pinigeliu like!"

//     }
//     const sql = 'UPDATE`accounts` SET `active` = "FALSE" WHERE`accounts`.`id` =' + account_id;
//     const [rows] = await connection.execute(sql);
//     return `saskaita sekmingai istrinta!`
// }

Account.isActive = async (connection, account_id) => {
    const sql = 'SELECT `active` FROM `accounts` WHERE `accounts`.`id` =' + account_id;
    const [rows] = await connection.execute(sql)
    return rows[0].active === "TRUE";
}

module.exports = Account;