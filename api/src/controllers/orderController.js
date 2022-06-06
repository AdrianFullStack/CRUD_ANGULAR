const Order = require('../models/order.model')

exports.all = (req, res) => {
    Order.all((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const order = new Order(req.body);

    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Order."
            });

        Order.findById(data.insertId, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the Order."
                });
            res.send(data);
        })
    });
}

exports.update = (req, res) => {

    console.log('BODY', req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Order.update(
        req.params.id,
        new Order(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.id
                    });
                }
            }

            Order.findById(data.id, (err, data) => {
                if (err)
                    res.status(500).send({
                        message: "Some error occurred while updating the Order."
                    });
                res.send(data);
            })
        }
    );
};

exports.delete = (req, res) => {
    Order.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Order with id " + req.params.id
                });
            }
        } else res.send({ status: true, message: `Order was deleted successfully!` });
    });
};
