const express = require('express');
const bodyParser = require('body-parser');

const Favorites = require('../models/favorite')
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

var authenticate = require('../authenticate');


 /*  ----------------- Methods Functions -------------------  */

getFavorites = (req,res,next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite!=null) {
            Favorites.findOne({user: req.user._id})
            .populate('dishes')
            .populate('user')
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err));
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

postFavorites = (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        //console.log(favorite);   
        if (favorite == null) {
            var dishIds = new Array()
            for (var i = 0; i < req.body.length; i++) {
                dishIds.push(req.body[i]._id)
            }
            Favorites.create({
                user: req.user._id,
                dishes: dishIds
            })
            .then((favorite) => {
//                console.log('New favorite document created for user '+favorite.user)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err));
        }
        else {
            Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                for (var i = 0; i < req.body.length; i++) {   
                    if (favorite.dishes.indexOf(req.body[i]._id) != -1) {
                        console.log("Dish "+req.body[i]._id+" already in user's favorites, attempt to push duplicate ignored.")
                    } 
                    else {
                        favorite.dishes.push(req.body[i]._id);
                    }
                }
                favorite.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
deleteFavorites = (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite==null) {
            err = new Error('Favorites already Empty.');
            err.status = 404;
            return next(err);
        }
        else {
            Favorites.findByIdAndRemove(favorite._id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })           
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
}

/*  ------------ Dish Id Functions -----------  */

postFavoriteId = (req, res, next) => {
    
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite == null) {
            Favorites.create({
                user: req.user._id,
                dishes: new Array(req.params.dishId)
            })
            .then((favorite) => {
                console.log('New favorite document created for user '+favorite.user)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err));
        }
        else {
            Favorites.findOne({user: req.user._id})
            .then((favorite) => {
                if (favorite.dishes.indexOf(req.params.dishId) != -1) {
                    err = new Error('Dish ' + req.params.dishId + ' already in favorites.');
                    err.status = 404;
                    return next(err);
                } 
                else {
                    favorite.dishes.push(req.params.dishId);
                    favorite.save();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
deleteFavoriteId = (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite == null) {
            err = new Error('Dish ' + req.params.dishId + ' not in in favorites.');
            err.status = 404;
            return next(err);
        }
        else if (favorite.dishes.indexOf(req.params.dishId) == -1) {
            err = new Error('Dish ' + req.params.dishId + ' not in in favorites.');
            err.status = 404;
            return next(err);
        }
        else {
            new_dishes = new Array()
            for (var i = 0; i < favorite.dishes.length; i++) {
                if (favorite.dishes[i] != req.params.dishId) {
                    new_dishes.push(favorite.dishes[i])
                }  
            }
            favorite.dishes = new_dishes;
            favorite.save()
            .then((favorite) => {
                console.log('favorite after update: '+favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
}

/* ------------- Dish Id Router --------------------  */

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, getFavorites)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, postFavorites)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, deleteFavorites);

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, postFavoriteId)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, deleteFavoriteId);

module.exports = favoriteRouter;