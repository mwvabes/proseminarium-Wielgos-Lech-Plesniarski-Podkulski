var express = require('express');
var router = express.Router();

const produktyKontroller = require('../controllers').produkty;
const promocjaKontroller = require('../controllers').promocja;
const powiazaniepromocjiKontroller = require('../controllers').powiazanie_promocji;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proseminarium' });
});
//API

router.get('/api', function(req, res, next) {
  res.send("Mikroserwis produktów");
});

router.get('/api/produkty', produktyKontroller.list);
router.get('/api/produkty/:id', produktyKontroller.getById);
router.post('/api/produkty', produktyKontroller.add);
router.put('/api/produkty/:id', produktyKontroller.update);
router.delete('/api/produkty/:id', produktyKontroller.delete);

router.get('/api/promocja', promocjaKontroller.list);
router.get('/api/promocja/:id', promocjaKontroller.getById);
router.post('/api/promocja', promocjaKontroller.add);
router.put('/api/promocja/:id', promocjaKontroller.update);
router.delete('/api/promocja/:id', promocjaKontroller.delete);


router.get('/api/powiazanie', powiazaniepromocjiKontroller.list);
router.get('/api/powiazanie/:id', powiazaniepromocjiKontroller.getById);
router.post('/api/powiazanie', powiazaniepromocjiKontroller.add);
router.put('/api/powiazanie/:id', powiazaniepromocjiKontroller.update);
router.delete('/api/powiazanie/:id', powiazaniepromocjiKontroller.delete);
//API


router.get('/produkty',produktyKontroller.list2);
router.get('/produkt',produktyKontroller.pre_add2);
router.post('/produkt',produktyKontroller.add2);
router.get('/produkt/:id', produktyKontroller.getById2);
router.get('/produkt/:id/edit', produktyKontroller.pre_update2);
router.post('/produkt/:id/edit', produktyKontroller.update2);
router.post('/produkt/:id/delete', produktyKontroller.delete2);
router.post('/produkty/:id/delete-json', produktyKontroller.usun_produkt_json);


router.get('/promocje',promocjaKontroller.list2);
router.get('/promocja/:id', promocjaKontroller.getById2);
router.get('/promocja',promocjaKontroller.pre_add2);
router.post('/promocja',promocjaKontroller.add2);
router.get('/promocja/:id/edit', promocjaKontroller.pre_update2);
router.post('/promocja/:id/edit', promocjaKontroller.update2);
router.post('/promocja/:id/delete', promocjaKontroller.delete2);
router.post('/promocja/:id/delete-json', promocjaKontroller.usun_promocja_json);


router.get('/powiazania',powiazaniepromocjiKontroller.list2);
/*

router.get('/powiazanie',powiazaniepromocjiKontroller.pre_add2);
router.post('/powiazanie',powiazaniepromocjiKontroller.add2);
router.get('/powiazanie/:id', powiazaniepromocjiKontroller.getById2);
router.get('/powiazanie/:id/edit', powiazaniepromocjiKontroller.pre_update2);
router.post('/powiazanie/:id/edit', powiazaniepromocjiKontroller.update2);
router.post('/powiazanie/:id/delete', powiazaniepromocjiKontroller.delete2);
router.post('/powiazanie/:id/delete-json', powiazaniepromocjiKontroller.usun_produkt_json);
*/


module.exports = router;
