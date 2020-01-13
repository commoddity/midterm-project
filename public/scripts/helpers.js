
//Helper Functions

//Database Queries
// const getMenuItemsFromDatabase = (db) => {
//   const queryString = `
//   SELECT id, name, price, image_url
//   FROM menu_items
//   `
//   return db.query(queryString)
//   .then((res) => res.rows)
//   .catch((err) => {
//     console.error('query error', err.stack);
//   });
// };

// exports.getMenuItemsFromDatabase = getMenuItemsFromDatabase;


// function createCounter() {
//   let counter = 0
//   const myFunction = function() {
//     counter = counter + 1
//     return counter
//   }
//   return myFunction
// }

// const increment = createCounter()
// const c1 = increment()
// const c2 = increment()
// const c3 = increment()

// console.log('example increment', c1, c2, c3)
