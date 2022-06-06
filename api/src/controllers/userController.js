const User = require('../models/user.model')

module.exports.findAll = (req, res) => {
    User.all((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error no controlado."
            });
        }
        res.send(data);
    });
}
