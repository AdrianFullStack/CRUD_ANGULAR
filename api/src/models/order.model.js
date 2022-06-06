const sql = require('../database')

const Order = function (order) {
    this.id = order.id || 0
    this.id_user = order.id_user
    this.order_number = order.order_number
    this.date_time = order.date_time
    this.provider_name = order.provider_name
    this.observation = order.observation
    this.total_value = order.total_value
    this.status = order.status || true
}

Order.all = (result) => {
    const query = `select *, o.id as id, u.id as idUser, date_format(date_time, '%Y-%m-%d') as date_time, o.status as status
                    from orders as o
                    inner join users u
                        on o.id_user = u.id`;
    sql.query(query, (err, res) => {
        if (err) result(null, err)
        result(null, res)
    })
}

Order.findById = (id, result) => {
    const query = `select *, o.id as id, u.id as idUser, date_format(date_time, '%Y-%m-%d') as date_time, o.status as status
                    from orders as o
                    inner join users u
                        on o.id_user = u.id
                    where o.id = ${id}`;
    sql.query(query, (err, res) => {
        if (err) result(null, err)
        result(null, res[0])
    })
}

Order.create = (order, result) => {
    sql.query("INSERT INTO orders SET ?", order, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Order.update = (id, order, result) => {
    sql.query(
        "UPDATE orders SET id_user = ?, order_number = ?, date_time = ?, provider_name = ?, total_value = ?, observation = ? WHERE id = ?",
        [order.id_user, order.order_number, order.date_time, order.provider_name, order.total_value, order.observation, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            order.id = Number(id)
            result(null, order);
        }
    );
};

Order.remove = (id, result) => {
    //const query = 'DELETE FROM orders WHERE id = ?'
    const query = 'UPDATE orders SET status = !status WHERE id = ?'
    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted with id: ", id);
        result(null, res);
    });
};



module.exports = Order
