const pool = require('../utils/pool.js');


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

