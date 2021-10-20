// const jwt = require('jsonwebtoken');
const pool = require('../utils/pool.js');
// module.exports = (req, res, next) => {
//     try {
//         if (req.user.role !== 'ADMIN') throw new Error('Unauthorized');
  
//         next();
//     } catch (error) {
//         error.status = 403;
//         next(error);
//     }
// };




module.exports = async (req, res, next) => {
    try {
        
        const { rows } = await pool.query('SELECT username FROM users_main WHERE username = $1', [req.user.username]);

        if (req.user.username !== rows[0].username) throw new Error('Unauthorized');
        next();
    } catch (error) {
        error.status = 403;
        next(error);
    }
};
