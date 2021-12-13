const Favorite = require('./models/favorite')

const obj = [{_id: "0"}, {_id:"1"}]
var values = [obj[0]._id, obj[1]._id];
var o = [0,2]
values.push(o);
console.log(values);

