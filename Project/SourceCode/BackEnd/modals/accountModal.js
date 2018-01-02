var mustache = require('mustache'),
    db = require('../fn/db'),
    q = require('q'),
    crypto = require('crypto');

exports.loadPassword = function(entity) {
    var d = q.defer();

    var sql = mustache.render('select password from tb_account where wallet_id= "{{wallet_id}}"', entity);

    db.load(sql).then((rows) => {
        d.resolve(rows[0]);
    });

    return d.promise;
};

//get id by wallet_id
exports.getIdClient = function(entity) {
    var d = q.defer();

    var sql = mustache.render('select id from tb_account where wallet_id= "{{wallet_id}}"', entity);

    console.log(sql);

    db.load(sql).then((rows) => {
        d.resolve(rows[0]);
    });

    return d.promise;
};

function randomString(length, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function checkExistsWalletString(wallet_id) {
    var d = q.defer();
    var sql = 'select id from tb_account where wallet_id= \'' + wallet_id + '\''
    db.load(sql).then(function(rows){
        if(rows.length > 0){
            console.log('wallet exists!');
            d.resolve(true);
        }else{
            console.log('wallet accept!');
            d.resolve(false);
        }
    });

    return d.promise;
}

exports.insert = function(entity) {
    var d = q.defer();

    const password = entity.password;
    const md5_password = crypto.createHash('md5').update(password).digest("hex");
    entity.password = md5_password;

    var wallet_id_random = randomString(32);
    console.log(wallet_id_random);

    // while(checkExistsWalletString(wallet_id_random)){
    //     wallet_id_random = randomString(32);
    // }

    entity.wallet_id = wallet_id_random;

    var sql = mustache.render('insert into tb_account(email, password, wallet_id, surplus) values("{{email}}", "{{password}}", "{{wallet_id}}", {{surplus}})', entity);

    db.insert(sql);

    d.resolve({
        status: 200,
        wallet_id: wallet_id_random,
        email: entity.email,
        surplus: entity.surplus
    });
    return d.promise;
};

exports.getEmailAndSurplus = function(entity) {
    var d = q.defer();
    var sql = mustache.render(
        'select email, surplus from tb_account where id = {{accountId}}'
        , entity
    );

    console.log(sql);

    db.load(sql).then(function(rows){
        d.resolve(rows[0]);
    });
    return d.promise;
};
