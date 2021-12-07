const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders')
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

 /*  ----------------- Methods Functions -------------------  */

getLeaders = (req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));}
postLeaders = (req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
}
putLeaders = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
}
deleteLeaders = (req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
}

/*  -------------------- Dishes Router --------------------  */

leaderRouter.route('/')
.get(getLeaders)
.post(postLeaders)
.put(putLeaders)
.delete(deleteLeaders);

/*  ------------ Dish Id Functions -----------  */

getLeaderId = (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
}
postLeaderId = (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
}
putLeaderId = (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
}
deleteLeaderId = (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}

/* ------------- Dish Id Router --------------------  */

leaderRouter.route('/:leaderId')
.get(getLeaderId)
.post(postLeaderId)
.put(putLeaderId)
.delete(deleteLeaderId);

module.exports = leaderRouter;