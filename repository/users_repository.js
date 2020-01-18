module.exports = (db) => {
  return {
    getUser: (userId) => {
      const queryString = `
      SELECT name, email, phone_number
      FROM users WHERE id = ${userId}
      `
      return db.query(queryString)
      .then((res) => res.rows[0])
      .catch(e => console.error(e))
    }
  }
};
