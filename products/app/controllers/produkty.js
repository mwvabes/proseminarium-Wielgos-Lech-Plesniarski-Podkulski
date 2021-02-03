const Produkty = require('../models').Produkty;
const Powiazanie_promocji = require('../models').Powiazanie_promocji;
const validator = require('../src/helpers/validate');
module.exports = {
    //api
    list(req, res) {
        return Produkty
            .findAll({
            })
            .then((produkties) => res.status(200).send(produkties))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        return Produkty
            .findByPk(req.params.id, {
            })
            .then((produkties) => {
                if (!produkties) {
                    return res.status(404).send({
                        message: 'Produkt Not Found',
                    });
                }
                return res.status(200).send(produkties);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    add(req, res) {
        const validationRule={
            "nazwa": "required|string",
            "opis": "required|string",
            "cena": "required|regex:/^[0-9]{1,10}[.,]{1}[0-9]{1,2}$/",
            "wymiary": "required|regex:/^([0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2})$/",
            "ean": "required|size:8|integer",
            "kategoria": "required|string",
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

                return Produkty
                    .create({
                        nazwa: req.body.nazwa,
                        opis: req.body.opis,
                        cena: req.body.cena,
                        wymiary: req.body.wymiary,
                        ean: req.body.ean,
                        kategoria: req.body.kategoria,
                    })
                    .then((produkties) => res.status(201).send(produkties))
                    .catch((error) => res.status(400).send(error));
            }
        });

    },
    delete(req, res) {
        return Produkty
            .findByPk(req.params.id)
            .then(produkties => {
                if (!produkties) {
                    return res.status(400).send({
                        message: 'Produkt Not Found',
                    });
                }
                return produkties
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        const validationRule={
            "nazwa": "required|string",
            "opis": "required|string",
            "cena": "required:regex:/^[0-9]{1,10}[.,]{1}[0-9]{1,2}$/",
            "wymiary": "required|regex:/^([0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2})$/",
            "ean": "required|size:8",
            "kategoria": "required"
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
                return Produkty
                    .findByPk(req.params.id, {})
                    .then(produkties => {
                        if (!produkties) {
                            return res.status(404).send({
                                message: 'coo? Not Found',
                            });
                        }
                        return produkties
                            .update({
                                nazwa: req.body.nazwa || produkties.nazwa,
                                opis: req.body.opis || produkties.opis,
                                cena: req.body.cena || produkties.cena,
                                wymiary: req.body.wymiary || produkties.wymiary,
                                ean: req.body.ean || produkties.ean,
                                kategoria: req.body.kategoria || produkties.kategoria,
                            })
                            .then(() => res.status(200).send(produkties))
                            .catch((error) => res.status(400).send(error));
                    })
                    .catch((error) => res.status(400).send(error));
            }
        });
    },
    //api




    list2(req, res) {
        return Produkty
            .findAll({
            })
            .then((produkties) => res.render('produkty/produkty',{produkties:produkties}))
            .catch((error) => { res.status(400).send(error); });
    },
    getById2(req, res) {
        return Produkty
            .findByPk(req.params.id, {
            })
            .then((produkties) => {
                if (!produkties) {
                    return res.status(404).send({
                        message: 'Produkt Not Found',
                    });
                }
                return res.render('produkty/produkt',
                    { produkt : produkties });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    pre_add2(req, res, next) {
        res.render('produkty/dodaj_produkt');
    },
    add2(req, res) {
        const validationRule={
            "nazwa": "required|string",
            "opis": "required|string",
            "cena": "required:regex:/^[0-9]{1,10}[.,]{1}[0-9]{1,2}$/",
            "wymiary": "required|regex:/^([0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2})$/",
            "ean": "required|size:8",
            "kategoria": "required",
        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.render('produkty/dodaj_produkt');
            } else {
                return Produkty
                    .create({
                        nazwa: req.body.nazwa,
                        opis: req.body.opis,
                        cena: req.body.cena,
                        wymiary: req.body.wymiary,
                        ean: req.body.ean,
                        kategoria: req.body.kategoria,
                    })
                    .then((produkties) => res.redirect('/produkty'))
                    .catch((error) => res.status(400).send(error));
            }
        });



    },
    pre_update2(req, res, next) {
        return Produkty
            .findByPk(req.params.id, {
            })
            .then((produkties) => {
                if (!produkties) {
                    return res.status(404).send({
                        message: 'Produkt Not Found',
                    });

                }
                res.render('produkty/edytuj_produkt', { produkties : produkties });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    update2(req, res) {
        const validationRule={
            "nazwa": "required|string",
            "opis": "required|string",
            "cena": "required:regex:/^[0-9]{1,10}[.,]{1}[0-9]{1,2}$/",
            "wymiary": "required|regex:/^([0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2}[x,X]{1}[0-9]{1,10}[.,]{1}[0-9]{1,2})$/",
            "ean": "required|size:8",
            "kategoria": "required",
        }
        validator(req.body,validationRule,{},(err,status)=>{
            if (!status) {
                res.redirect('/produkt/' + req.params.id+"/edit");
            } else {
        return Produkty
            .findByPk(req.params.id, {
            })
            .then(produkties => {
                if (!produkties) {
                    return res.status(404).send({
                        message: 'coo? Not Found',
                    });
                }
                return produkties
                    .update({
                        nazwa: req.body.nazwa || produkties.nazwa,
                        opis: req.body.opis || produkties.opis,
                        cena: req.body.cena || produkties.cena,
                        wymiary: req.body.wymiary || produkties.wymiary,
                        ean: req.body.ean || produkties.ean,
                        kategoria: req.body.kategoria || produkties.kategoria,
                    })
                    .then(() =>  res.redirect('/produkt/' + req.params.id))
                    .catch((error) => res.redirect('/produkt/' + req.params.id));
            })
            .catch((error) => res.redirect('/produkt/' + req.params.id));
            }
        });

    },
    delete2(req, res) {
        return Produkty
            .findByPk(req.params.id)
            .then(produkties => {
                if (!produkties) {
                    return res.status(400).send({
                        message: 'Co ? Not Found',
                    });
                }
                return produkties
                    .destroy()
                    .then(() =>  res.redirect('/produkty'))
                    .catch((error) => res.redirect('/produkt/' + req.params.id));
            })
            .catch((error) => res.redirect('/produkt/' + req.params.id));
    },
    usun_produkt_json(req, res, next) {
        return Produkty.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({ msg: "Success" });
        })
    },

};
