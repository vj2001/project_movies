const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', async (req, res) => {

        try{
            let info = await  Favorite.find({ "movieId": req.body.movieId })
            return res.status(200).json({ success: true, favoriteNumber: info.length })
        }catch(error){
            
            return res.status(400).send(err)
        }

})



router.post('/favorited', async (req, res) => {

         try{
            let info = await Favorite.find({ "movieId": req.body.movieId, "key": req.body.userFrom })
            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        }catch(err){
            return res.status(400).send(err)
        }
})





router.post('/addToFavorite', async (req, res) => {

    userFrom = req.body.userFrom;
    movieId = req.body.movieId;
    movieTitle = req.body.movieTitle;
    moviePost = req.body.moviePost;
    key = req.body.userFrom;
    const favorite = new Favorite({userFrom,movieId,movieTitle,moviePost,key});
    try{
        await favorite.save();
        return res.status(200).json({ success: true })
    }catch(err){
        return res.status(400).send(err)
    }

})




router.post('/getFavoredMovie', async (req, res) => {

        try{
            let favorites = await Favorite.find({ "key": req.body.userFrom });
            return res.status(200).json({ success: true, favorites })
        }catch(error){
            return res.status(400).send(error)
        }

})

router.post('/removeFromFavorite', async(req, res) => {

    console.log(req.body.movieId)
    console.log(req.body.userFrom)
    try{
        await Favorite.findOneAndDelete({ movieId: req.body.movieId, key: req.body.userFrom });
        return res.status(200).json({ success: true })
    }catch(error){
        return res.status(400).send(error)
    }

})



module.exports = router;