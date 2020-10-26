const express = require('express');

const router = express.Router();


router.post('/uploadImage', (req, res, next) => {
    const file = req.files;
    console.log('file at server', file);
    res.send({
        status: 200,
        message: 'file uploaded.'
    })
});

export default router;