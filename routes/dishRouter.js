const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

 /*  ----------------- Methods Functions -------------------  */

all_function = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}
getDishes = (req,res,next) => {
    res.end('Will send all the dishes to you!');
}
postDishes = (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
}
putDishes = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
}
deleteDishes = (req, res, next) => {
    res.end('Deleting all dishes');
}

/*  -------------------- Dishes Router --------------------  */

dishRouter.route('/')
.all(all_function)
.get(getDishes)
.post(postDishes)
.put(putDishes)
.delete(deleteDishes);

/*  ------------ Dish Id Functions -----------  */

getDishId = (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
}
postDishId = (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
}
putDishId = (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
}
deleteDishId = (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
}

/* ------------- Dish Id Router --------------------  */

dishRouter.route('/:dishId')
.all(all_function)
.get(getDishId)
.post(postDishId)
.put(putDishId)
.delete(deleteDishId);

module.exports = dishRouter;