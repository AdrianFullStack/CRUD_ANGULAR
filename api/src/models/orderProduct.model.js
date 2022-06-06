const sql = require('../database')

const OrderProduct = function (orderProduct) {
    this.id = orderProduct.id || 0
    this.id_order = orderProduct.id_order
    this.value_unit = orderProduct.value_unit
    this.unit = orderProduct.unit
    this.description = orderProduct.description || ''
    this.sku = orderProduct.sku
    this.quantity = orderProduct.quantity
    this.qty_box = orderProduct.qty_box
    this.weight = orderProduct.weight
    this.volumen = orderProduct.volumen
    this.mark = orderProduct.mark
    this.status = orderProduct.status || true
}

OrderProduct.findById = (id, result) => {
    const query = `select *, op.id as id, o.id as orderId, op.status as status
                    from ordersproducts as op
                    inner join orders o on op.id_order = o.id
                    where op.id = ${id}`;
    sql.query(query, (err, res) => {
        if (err) result(null, err)
        result(null, res[0])
    })
}

OrderProduct.all = (result) => {
    const query = `select *, op.id as id, o.id as orderId, op.status as status
                    from ordersproducts as op
                    inner join orders o on op.id_order = o.id`;
    sql.query(query, (err, res) => {
        if (err) result(null, err)
        result(null, res)
    })
}

OrderProduct.create = (orderProduct, result) => {
    sql.query("INSERT INTO ordersProducts SET ?", orderProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

OrderProduct.update = (id, orderProduct, result) => {
    sql.query(
        `UPDATE ordersProducts SET value_unit = ?, unit = ?, description = ?, quantity = ?,
             qty_box = ?, weight = ?, volumen = ?, mark = ? WHERE id = ?`,
        [orderProduct.value_unit, orderProduct.unit, orderProduct.description,
            orderProduct.quantity, orderProduct.qty_box, orderProduct.weight,
            orderProduct.volumen, orderProduct.mark, id],
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

            orderProduct.id = Number(id)
            result(null, { id: id, ...orderProduct });
        }
    );
};

OrderProduct.remove = (id, result) => {
    const query = 'UPDATE ordersProducts SET status = !status WHERE id = ?'
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



module.exports = OrderProduct
