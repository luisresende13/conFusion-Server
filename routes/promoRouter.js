const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

 /*  ----------------- Methods Functions -------------------  */

all_function = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}
getPromos = (req,res,next) => {
    res.end('Will send all the promotions to you!');
}
postPromos = (req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
}
putPromos = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
}
deletePromos = (req, res, next) => {
    res.end('Deleting all promotions');
}

/*  -------------------- Dishes Router --------------------  */

promoRouter.route('/')
.all(all_function)
.get(getPromos)
.post(postPromos)
.put(putPromos)
.delete(deletePromos);

/*  ------------ Dish Id Functions -----------  */

getPromoId = (req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
}
postPromoId = (req, res, next) => {
 res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
}
putPromoId = (req, res, next) => {
  res.write('Updating the promotion: ' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
}
deletePromoId = (req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
}

/* ------------- Dish Id Router --------------------  */

promoRouter.route('/:promoId')
.all(all_function)
.get(getPromoId)
.post(postPromoId)
.put(putPromoId)
.delete(deletePromoId);

module.exports = promoRouter;