const OrderProduct = require('../models/orderProduct.model')

exports.all = (req, res) => {
    OrderProduct.all((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    console.log('Body', req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const orderProduct = new OrderProduct(req.body);

    OrderProduct.create(orderProduct, (err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the OrderProduct."
            });

        OrderProduct.findById(data.insertId, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the OrderProduct."
                });
            res.send(data);
        })
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    OrderProduct.update(
        req.params.id,
        new OrderProduct(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found OrderProduct with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating OrderProduct with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    OrderProduct.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found OrderProduct with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete OrderProduct with id " + req.params.id
                });
            }
        } else res.send({ status: true, message: `OrderProduct was deleted successfully!` });
    });
};
