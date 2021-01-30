const Promocja = require('../models').Promocja;
const Powiazanie_promocji = require('../models').Powiazanie_promocji;
const validator = require('../src/helpers/validate');
module.exports = {
    //api
    list(req, res) {
        return Promocja
            .findAll({
            })
            .then((promocjaies) => res.status(200).send(promocjaies))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        return Promocja
            .findByPk(req.params.id, {
            })
            .then((promocjaies) => {
                if (!promocjaies) {
                    return res.status(404).send({
                        message: 'Produkt Not Found',
                    });
                }
                return res.status(200).send(promocjaies);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    add(req, res) {
        const validationRule={
            "nazwa_promocji": "required|string",
            "wartosc_promocji": "required|integer",
            "min_ilosc_produktu_w_koszyku": "required|integer",

        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {

                return Promocja
            .create({
                nazwa_promocji: req.body.nazwa_promocji,
                wartosc_promocji: req.body.wartosc_promocji,
                min_ilosc_produktu_w_koszyku: req.body.min_ilosc_produktu_w_koszyku,
            })
            .then((promocjaies) => res.status(201).send(promocjaies))
            .catch((error) => res.status(400).send(error));
            }
        });
    },

    update(req, res) {
        const validationRule={
            "nazwa_promocji": "required|string",
            "wartosc_promocji": "required|integer",
            "min_ilosc_produktu_w_koszyku": "required|integer",

        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {

                return Promocja
            .findByPk(req.params.id, {

            })
            .then(promocjaies => {
                if (!promocjaies) {
                    return res.status(404).send({
                        message: 'Promocja Not Found',
                    });
                }
                return promocjaies
                    .update({
                        nazwa_promocji: req.body.nazwa_promocji || promocjaies.nazwa_promocji,
                        wartosc_promocji: req.body.wartosc_promocji || promocjaies.wartosc_promocji,
                        min_ilosc_produktu_w_koszyku: req.body.min_ilosc_produktu_w_koszyku || promocjaies.min_ilosc_produktu_w_koszyku,
                    })
                    .then(() => res.status(200).send(promocjaies))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
            }
        });
    },

    delete(req, res) {
        return Promocja
            .findByPk(req.params.id)
            .then(promocjaies => {
                if (!promocjaies) {
                    return res.status(400).send({
                        message: 'Promocja Not Found',
                    });
                }
                return promocjaies
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //api

    list2(req, res) {
        return Promocja
            .findAll({
            })
            .then((promocjaies) =>  res.render('promocje/promocje',{promocjaies:promocjaies}))
            .catch((error) => { res.status(400).send(error); });
    },
    getById2(req, res) {
        return Promocja
            .findByPk(req.params.id, {
            })
            .then((promocjaies) => {
                if (!promocjaies) {
                    return res.status(404).send({
                        message: 'Promocja Not Found',
                    });
                }

                return res.render('promocje/promocja', { promocja : promocjaies });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    pre_add2(req, res, next) {
        res.render('promocje/dodaj_promocje');
    },
    add2(req, res) {
        const validationRule={
            "nazwa_promocji": "required|string",
            "wartosc_promocji": "required|integer",
            "min_ilosc_produktu_w_koszyku": "required|integer",

        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.render('promocja/dodaj_promocje');
            } else {

                return Promocja
                    .create({
                        nazwa_promocji: req.body.nazwa_promocji,
                        wartosc_promocji: req.body.wartosc_promocji,
                        min_ilosc_produktu_w_koszyku: req.body.min_ilosc_produktu_w_koszyku,
                    })
                    .then((promocjaies) => res.redirect('/promocje'))
                    .catch((error) => res.status(400).send(error));
            }
        });
    },
    pre_update2(req, res, next) {
        return Promocja
            .findByPk(req.params.id, {
            })
            .then((promocjaies) => {
                if (!promocjaies) {
                    return res.status(404).send({
                        message: 'Produkt Not Found',
                    });

                }
                res.render('promocje/edytuj_promocje', { promocjaies : promocjaies });
            })
            .catch((error) => {
                res.redirect('/promocje/'+req.params.id);
            });
    },
    update2(req, res) {
        const validationRule={
            "nazwa_promocji": "required|string",
            "wartosc_promocji": "required|integer",
            "min_ilosc_produktu_w_koszyku": "required|integer",

        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.status(412)
                res.redirect('/promocja/' + req.params.id+"/edit")
            } else {

                return Promocja
                    .findByPk(req.params.id, {

                    })
                    .then(promocjaies => {
                        if (!promocjaies) {
                            return res.status(404).send({
                                message: 'Promocja Not Found',
                            });
                        }
                        return promocjaies
                            .update({
                                nazwa_promocji: req.body.nazwa_promocji || promocjaies.nazwa_promocji,
                                wartosc_promocji: req.body.wartosc_promocji || promocjaies.wartosc_promocji,
                                min_ilosc_produktu_w_koszyku: req.body.min_ilosc_produktu_w_koszyku || promocjaies.min_ilosc_produktu_w_koszyku,
                            })
                            .then(() => res.redirect('/promocja/' + req.params.id))
                            .catch((error) => res.redirect('/promocja/' + req.params.id));
                    })
                    .catch((error) => res.redirect('/promocja/' + req.params.id));
            }
        });
    },

    delete2(req, res) {
        return Promocja
            .findByPk(req.params.id)
            .then(promocjaies => {
                if (!promocjaies) {
                    return res.status(400).send({
                        message: 'Promocja Not Found',
                    });
                }
                return promocjaies
                    .destroy()
                    .then(() => res.redirect('/promocje'))
                    .catch((error) => res.redirect('/promocja/' + req.params.id));
            })
            .catch((error) => res.redirect('/promocja/' + req.params.id));
    },

    usun_promocja_json(req, res, next) {
        return Promocja.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({ msg: "Success" });
        })
    },
};