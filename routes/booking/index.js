const express = require('express');

const router = express.Router();
const movie = require('../../controller/movie.controller')
router.get('/', movie.getMain)
router.get('/seat', movie.getSeats)
router.get('/history', movie.getHistory)
router.get('/combo', movie.getCombo)
router.get('/ticket', movie.getTicket)
router.get('/detail', movie.getDetail)
// --------------------------
router.post('/seat', movie.postSeats)
router.get('/bill',movie.getBill)
router.post('/bill',movie.postBill)
router.get('/search', movie.getSearch)
router.get('/contact',movie.getContact)
router.get('/about',movie.getAbout)
router.get('/showing', movie.getMovieShowing)


module.exports = router