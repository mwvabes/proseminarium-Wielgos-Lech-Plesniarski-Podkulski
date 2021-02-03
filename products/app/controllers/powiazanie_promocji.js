const Powiazanie_promocji = require('../models').Powiazanie_promocji;
const Produkty = require('../models').Produkty;//Class
const Promocja = require('../models').Promocja;//Course

module.exports = {
    list(req, res) {
        return Powiazanie_promocji
            .findAll({
                include: [{
                    model: Produkty,
                    as: 'powiazania_produkt'
                },{
                    model: Promocja,
                    as: 'powiazania_promocja'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Produkty, as: 'powiazania_produkt' }, 'createdAt', 'DESC'],
                    ['createdAt', 'DESC'],
                    [{ model: Promocja, as: 'powiazania_promocja' }, 'createdAt', 'DESC'],
                ],
            })
            .then((powiazanies) => res.status(200).send(powiazanies))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Powiazanie_promocji
            .findByPk(req.params.id_powiazania, {
                include: [{
                    model: Produkty,
                    as: 'powiazania_produkt'
                },{
                    model: Promocja,
                    as: 'powiazania_promocja'
                }],
            })
            .then((powiazanie_promocji) => {
                if (!powiazanie_promocji) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                return res.status(200).send(powiazanie_promocji);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Powiazanie_promocji
            .create({
                id_produktu: req.body.id_produktu,
                id_promocji: req.body.id_promocji,
            })
            .then((powiazanie_promocji) => res.status(201).send(powiazanie_promocji))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Powiazanie_promocji
            .findByPk(req.params.id_powiazania, {
                include: [{
                    model: Produkty,
                    as: 'powiazania_produkt'
                },{
                    model: Promocja,
                    as: 'powiazania_promocja'
                }],
            })
            .then(powiazanie_promocji => {
                if (!powiazanie_promocji) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                return powiazanie_promocji
                    .update({
                        id_produktu: req.body.id_produktu || powiazanie_promocji.id_produktu,
                        id_promocji: req.body.id_promocji || powiazanie_promocji.id_promocji,
                    })
                    .then(() => res.status(200).send(powiazanie_promocji))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Powiazanie_promocji
            .findByPk(req.params.id)
            .then(powiazanie_promocji => {
                if (!powiazanie_promocji) {
                    return res.status(400).send({
                        message: 'Student Not Found',
                    });
                }
                return powiazanie_promocji
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    list2(req, res) {
        return Powiazanie_promocji
            .findAll({
                include: [{
                    model: Produkty,
                    as: 'powiazania_produkt'
                },{
                    model: Promocja,
                    as: 'powiazania_promocja'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Produkty, as: 'powiazania_produkt' }, 'createdAt', 'DESC'],
                    ['createdAt', 'DESC'],
                    [{ model: Promocja, as: 'powiazania_promocja' }, 'createdAt', 'DESC'],
                ],
            })
            .then((powiazanies,powiazania_produkt,powiazania_promocja) => res.render('powiazania/powiazania',{powiazanies:powiazanies,powiazania_produkties:powiazania_produkt,powiazania_promocjaies:powiazania_promocja}))
            .catch((error) => { res.status(400).send(error); });
    },
};