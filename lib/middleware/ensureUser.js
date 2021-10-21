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
        
        //***MIGHT HAVE TO BE UPDATED***
        const { rows } = await pool.query('SELECT username FROM users_info WHERE id = $1', [req.params.id]);

        if (req.user.username !== rows[0].username) throw new Error('Unauthorized');
        next();
    } catch (error) {
        error.status = 403;
        next(error);
    }
};


/*  

 SELECT users_info.user as infoUser, preferences.username as prefusername, users_profile.username as profileUsername
        FROM users_info
        LEFT JOIN preferences
        LEFT JOIN users_profile
        WHERE user_info.id = $1
        OR w
        [req.params.id])  
        if (req.user.username !== rows[0].owner) throw new Error('Unauthorized');
*/
