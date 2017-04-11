/**
 * Created by Vuki on 25.3.2017..
 */
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Five iOS Project app Server',
        authors: 'Matej Vukosav and Ivan Srdic, Luka Muzic'
    });
});

module.exports = router;
