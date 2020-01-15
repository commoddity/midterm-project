module.exports = (db) => {
  return {
    // postOrder: () => {
    //     const queryString = `
    //     INSERT INTO orders(restaurant_id, user_id, picked_up)
    //     VALUES (1, 1);
    //     `
    //   return db.query(queryString)
    //   .then((res) => res.rows)
    //   .catch((err) => {
    //     console.error('query error', err.stack);
    //   });
    // },

    // postOrders: (orderData) => {
    //   console.log(`Running from orders_repository: postOrders`)
    //   for (let [id, quantity] of Object.entries(orderData)) {
    //     const queryString = `
    //     INSERT INTO orders(restaurant_id, user_id, picked_up)
    //     VALUES ($1, $2, true);
    //     `
    //     values = [id, quantity];
    //     return db.query(queryString, values)
    //     .then((res) => res.rows)
    //     .catch((err) => {
    //       console.error('query error', err.stack);
    //     });
    //   }
    // }
    postOrders: (orderData) => {
      const orderKeysStrArr = (Object.keys(orderData));
      const orderKeyNumArr = orderKeysStrArr.map(str => Number(str)); //[ 1, 2, 4 ]
      // console.log(objKeys)
      //const objVal =Object.values(orderData);
      const dataForInsert = Object.entries(orderData);
      //The function below converts the object intems into numbers. 
      //e.g- [["1", "2"], ["3", "65"]] ==> [[1, 2],[3, 65]]
      const o = dataForInsert.map((ar) =>{
        return(
          ar.map(num => Number(num))
          )
        })
      const queryString2 = `INSERT INTO orders (restaurant_id, user_id, picked_up) VALUES (1,1,false);`
      const queryString = `INSERT INTO order_items (menu_item_id,order_id) VALUES ($1, $2);`;
      const queryTest = `SELECT id FROM orders;`
      const conditionedData = o; //console.log(conditionedData)
      // db.query(queryString2)
      // .then((data) => {
      //   db.query(queryTest)
      //   .then((data) => {
      //     let lastOrderId;
      //     const something = data.rows;
      //     if (something.length) {
      //       lastOrderId = something[something.length - 1].id;

      //     }
      //   })
      // })      
      // .catch(err => console.error(err));
      // for (let i = 0; i < orderKeyNumArr.length; i++) {
      //   db.query(queryString, [orderKeyNumArr[i], 4]).then((data) => {console.log(`Success`)}).catch(e => console.error(e));
      // }
      db.query(queryString2)
      .then(() => {
        db.query(queryTest)
        .then((data) => {
          let lastOrderId;
          const idArr = data.rows;
          if (idArr.length) {lastOrderId = idArr[idArr.length - 1].id} console.log(lastOrderId);
          for (let i = 0; i < orderKeyNumArr.length; i++) {
              db.query(queryString, [orderKeyNumArr[i], lastOrderId]).then((data) => {console.log(`Success`)}).catch(e => console.error(e));
          }
        })
      })
      .catch(e => console.error(e))
    }
  }
};

// Functions here need work ^^^^
