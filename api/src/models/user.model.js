const sql = require('../database')

const User = (user) => {
    this.id = user.id
    this.name = user.name
    this.email = user.email
}

User.all = (result) => {
    const query = 'select * from users where status = true';
    sql.query(query, (err, res) => {
        if (err) result(null, err)
        result(null, res)
    })
}

module.exports = User
