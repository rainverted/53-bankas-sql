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
    await Account.create(connection, 2, 'EUR');
    return `Naujas banko vartotojas užregistruotas: ${userFirstname} ${userLastname}. `;
}

User.depositMoneybyId = async (connection) => {

}

module.exports = User;

