const mongodb = require("../database/mongodb");
const collectionName = "events";
console.log(mongodb);
const collection = mongodb.collection(collectionName);

// const model = {
//   listEvent: () => {
//     const cursor = collection.find();
//     return cursor.toArray();
//   },
// };

// module.exports = model;
