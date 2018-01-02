var express = require('express'),
    exchangeModal = require('../modals/exchangeModal'),
    q = require('q'),
    accountModal = require('../modals/accountModal');


var r = express.Router();

//:accountId, req.params.accountId
r.get('/dsGiaoDich/:walletId', function(req, res) {
    accountModal.getIdClient({wallet_id: req.params.walletId})
        .then((accountId) => {
            exchangeModal.loadExchangeById({accountId: accountId.id}).then(function(data) {
                res.send({
                    status: 200,
                    data: data
                });
            });
        });
});

//data is json: id, account_id, date, dest_account_id, amount
r.get('/dsTatCaGiaoDich', function(req, res) {
    exchangeModal.loadAll().then(function(data) {
        res.send({
            status: 200,
            data: data
        });
    });
});

//truyen soDuCongThem?id=xxx&number=xxx
r.get('/soDuCongThem', function(req, res) {
    exchangeModal.getSurplus({accountId: req.query.id}).then((value) => {
        var entity = {
            accountId: req.query.id,
            number: parseInt(req.query.number) + parseInt(value.surplus)
        };
        exchangeModal.updateSurplus(entity).then(() => {
            res.send({
                status: 200,
                surplus: entity.number
            });
        });
    });
});

//truyen soDuTruBot?id=xxx&number=xxx
r.get('/soDuTruBot', function(req, res) {
    exchangeModal.getSurplus({accountId: req.query.id}).then((value) => {
        var entity = {
            accountId: req.query.id,
            number: parseInt(value.surplus) - parseInt(req.query.number)
        };
        exchangeModal.updateSurplus(entity).then(() => {
            res.send({
                status: 200,
                surplus: entity.number
            });
        });
    });
});

//truyen params.accountId
r.get('/soDu/:accountId', function(req, res){
    exchangeModal.getSurplus({accountId: req.params.accountId}).then((value)=>{
        res.send({
            status: 200,
            surplus: value.surplus
        });
    });
});

//fromWalletId, toWalletId, amount
r.post('/chuyenTien', function(req, res){

    var fromAccountId;
    var toAccountId;

    console.log(req.body.fromWalletId);
    console.log(req.body.toWalletId);

    accountModal.getIdClient({wallet_id: req.body.fromWalletId})
    .then((data)=>{
        fromAccountId = data.id;
    })
    .then(()=>{
        accountModal.getIdClient({wallet_id: req.body.toWalletId})
        .then((data)=>{
            toAccountId = data.id;
        })
            // check and update surplus for from account
        .then(() => {
            exchangeModal.getSurplus({accountId: fromAccountId}).then((value) => {
                var d = q.defer();
                if(value.surplus < parseInt(req.body.amount)){
                    res.send({
                        status: 406,
                        surplusRemain: null
                    });
                    d.resolve(true);
                } else{
                    var entity = {
                        accountId: fromAccountId,
                        number: parseInt(value.surplus) - parseInt(req.body.amount)
                    }
                    exchangeModal.updateSurplus(entity).then(() => {
                        res.send({
                            status: 200,
                            surplusRemain: entity.number
                        });
                        d.resolve(false);
                    });
                }

                return d.promise;
            })
                // check and update surplus for to account
            .then((error)=>{
                console.log("error: "  + error);
                if(error === false){
                    exchangeModal.getSurplus({accountId: toAccountId})
                        .then((value) => {
                            var d = q.defer();
                            var entity_updateSurplus = {
                                accountId: toAccountId,
                                number: parseInt(value.surplus) + parseInt(req.body.amount)
                            };

                            exchangeModal.updateSurplus(entity_updateSurplus);

                            d.resolve();
                            return d.promise;
                        })
                        .then(() => {
                            var date = new Date();
                            var time = {
                                day: date.getDate(),
                                month: date.getMonth(),
                                year: date.getFullYear(),
                                hour: date.getHours(),
                                min: date.getMinutes(),
                                sec: date.getSeconds()
                            };
                            var entity_addExchangeDetail = {
                                accountId: fromAccountId,
                                destAccountId: toAccountId,
                                date: time.year + "/" + time.month + "/" + time.day + ' '  + 0 + ':' + 0 + ':' + 0,
                                amount: req.body.amount
                            };

                            console.log(entity_addExchangeDetail);

                            exchangeModal.addExchangeDetail(entity_addExchangeDetail);
                        });
                }
            });
        });


    });
});

module.exports = r;
