const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const {err} = req.query;

    res.render('error', { error: err });
}
);


module.exports = router;