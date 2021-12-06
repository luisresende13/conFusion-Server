const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

 /*  ----------------- Methods Functions -------------------  */

all_function = (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}
getLeaders = (req,res,next) => {
    res.end('Will send all the leaders to you!');
}
postLeaders = (req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
}
putLeaders = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
}
deleteLeaders = (req, res, next) => {
    res.end('Deleting all leaders');
}

/*  -------------------- Dishes Router --------------------  */

leaderRouter.route('/')
.all(all_function)
.get(getLeaders)
.post(postLeaders)
.put(putLeaders)
.delete(deleteLeaders);

/*  ------------ Dish Id Functions -----------  */

getLeaderId = (req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
}
postLeaderId = (req, res, next) => {
 res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
}
putLeaderId = (req, res, next) => {
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('Will update the leader: ' + req.body.name + 
        ' with details: ' + req.body.description);
}
deleteLeaderId = (req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
}

/* ------------- Dish Id Router --------------------  */

leaderRouter.route('/:leaderId')
.all(all_function)
.get(getLeaderId)
.post(postLeaderId)
.put(putLeaderId)
.delete(deleteLeaderId);

module.exports = leaderRouter;