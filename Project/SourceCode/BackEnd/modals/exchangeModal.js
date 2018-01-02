var mustache = require('mustache'),
    db = require('../fn/db'),
    q = require('q');

//return data: id, account_id, date, dest_account_id, amount
exports.loadAll = function() {
    var sql = 'select ex.id, acc1.wallet_id as from_acc, acc2.wallet_id as to_acc, ex.date, ex.amount from tb_account acc1, tb_account acc2, tb_exchange ex where acc1.id = ex.account_id and acc2.id = ex.dest_account_id';
    return db.load(sql);
};

exports.loadExchangeById = function(entity){
    var sql = mustache.render('select * from tb_exchange where account_id = {{accountId}}', entity);
    console.log('exchange modal: ' + sql);
    return db.load(sql);
};

exports.insert = function(entity) {
    var sql = mustache.render(
        'insert into tb_exchange(account_id, date, dest_account_id, amount) values({{account_id}}, "{{date}}", {{dest_account_id}}, {{amount}})'
        , entity
    );

    return db.insert(sql);
};

exports.getSurplus = function(entity) {
    var d = q.defer();
    var sql = mustache.render(
        'select surplus from tb_account where id = {{accountId}}'
        , entity
    );

    console.log(sql);

    db.load(sql).then(function(rows){
        d.resolve(rows[0]);
    });
    return d.promise;
};

exports.updateSurplus = function(entity) {
    var d = q.defer();
    var sql = mustache.render(
        'update tb_account set surplus = {{number}} where id = {{accountId}}'
        , entity
    );

    console.log(sql);

    d.resolve(db.update(sql));
    return d.promise;
};

//accountId, date, destAccountId, amount
exports.addExchangeDetail = function(entity){
    var d = q.defer();
    var sql = 'insert into tb_exchange(account_id, date, dest_account_id, amount) values(' + entity.accountId + ', \'' + entity.date + '\', ' + entity.destAccountId + ', ' + entity.amount  + ')';

    console.log(sql);

    d.resolve(db.insert(sql));
    return d.promise;
};
