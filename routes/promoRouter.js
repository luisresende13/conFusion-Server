const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions')

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

var authenticate = require('../authenticate');


 /*  ----------------- Methods Functions -------------------  */

all_function = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}
getPromos = (req,res,next) => {
    Promotions.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));}
postPromos = (req, res, next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promotion Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
}
putPromos = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
}
deletePromos = (req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
}

/*  ------------ Dish Id Functions -----------  */

getPromoId = (req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
}
postPromoId = (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
}
putPromoId = (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
}
deletePromoId = (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

/* ------------- Dish Id Router --------------------  */

promoRouter.route('/')
.get(getPromos)
.post(authenticate.verifyUser, authenticate.verifyAdmin, postPromos)
.put(authenticate.verifyUser, authenticate.verifyAdmin, putPromos)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deletePromos);

promoRouter.route('/:promoId')
.get(getPromoId)
.post(authenticate.verifyUser, authenticate.verifyAdmin, postPromoId)
.put(authenticate.verifyUser, authenticate.verifyAdmin, putPromoId)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, deletePromoId);

module.exports = promoRouter;