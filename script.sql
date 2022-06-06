create database crud;
    
create table users
(
    id     int auto_increment,
    name   varchar(50)          not null,
    email  varchar(50)          not null,
    status tinyint(1) default 1 not null,
    constraint users_id_uindex
        unique (id),
    constraint users_name_uindex
        unique (name)
);

alter table users
    add primary key (id);

create table orders
(
    id            int auto_increment,
    id_user       int                                  not null,
    order_number  varchar(20)                          null,
    date_time     date                                 null,
    provider_name varchar(100)                         not null,
    date_created  timestamp  default CURRENT_TIMESTAMP null,
    observation   longtext                             null,
    total_value   decimal(10, 2)                       not null,
    status        tinyint(1) default 1                 not null,
    constraint orders_id_uindex
        unique (id),
    constraint orders_users_id_fk
        foreign key (id_user) references users (id)
);

alter table orders
    add primary key (id);

create table ordersproducts
(
    id          int auto_increment,
    id_order    int                         not null,
    value_unit  decimal(10, 2)              null,
    unit        enum ('Cm', 'Kg', 'Libras') not null,
    description longtext                    null,
    sku         varchar(50)                 not null,
    quantity    decimal(10, 2)              not null,
    qty_box     int                         null,
    weight      decimal(10, 2)              null,
    volumen     decimal(10, 2)              null,
    mark        varchar(50)                 not null,
    status      tinyint(1) default 1        not null,
    constraint ordersproducts_id_uindex
        unique (id),
    constraint ordersproducts_orders_id_fk
        foreign key (id_order) references orders (id)
);

alter table ordersproducts
    add primary key (id);

