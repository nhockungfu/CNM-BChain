var express = require('express'),
    accountModal = require('../modals/accountModal'),
    crypto = require('crypto');

var r = express.Router();

//email*, password*, wallet_id, surplus
r.post('/dangKy', function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    console.log(req.body);

    accountModal.insert(req.body).then((data) => {
        res.send(data);
    });
});

//wallet_id, password
r.post('/dangNhap', function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    accountModal.loadPassword({wallet_id: req.body.wallet_id}).then(function(obj) {

        console.log('password md5: ' + obj.password);

        const db_password = obj.password;
        const client_password = crypto.createHash('md5').update(req.body.password).digest("hex");

        var client_id;
        accountModal.getIdClient({wallet_id: req.body.wallet_id}).then((obj) => {
            client_id = obj.id;

            if (client_password === db_password) {
                accountModal.getEmailAndSurplus({accountId: client_id}).then((obj) => {
                    res.send({
                        status: 200,
                        wallet_id: req.body.wallet_id,
                        email: obj.email,
                        surplus: obj.surplus
                    });
                })
            } else {
                res.send({
                    status: 400,
                    walletId: '',
                    email: '',
                    surplus: ''
                });
            }
        });
    });
});

module.exports = r;
