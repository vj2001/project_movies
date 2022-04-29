const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favourite');

router.post('/favoriteNumber', async(req, res) => {
   
    try {
     favList =  await Favorite.find({ "movieId": req.body.movieId });
     res.status(200).json({ success: true, favoriteNumber: info.length });
    }catch(err){
        return res.status(400).send(err)
    }


})



router.post('/favorited', async (req, res) => {

        try{
            const info = Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom });

            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        }catch(err){
            return res.status(400).send(err)
        }
})








router.post('/removeFromFavorite', async (req, res) => {

        try{
            Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom });
            res.status(200).json({ success: true, doc });
        }catch(err){
            return res.status(400).send(err)
        }

})




router.post('/addToFavorite', async (req, res) => {

    const favorite = await new Favorite(req.body)

    try{
        await favorite.save();
        return res.status(200).json({ success: true })
    }catch(err){
        return res.status(400).send(err)
    }

})




router.post('/getFavoredMovie', async (req, res) => {

        try{
            const favorite = Favorite.find({ 'userFrom': req.body.userFrom });
            return res.status(200).json({ success: true, favorites })
        }catch(err){
            return res.status(400).send(err)
        }
})

router.post('/removeFromFavorite', async (req, res) => {

        try{
            await  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom });
            return res.status(200).json({ success: true });
        }catch(err){
            return res.status(400).send(err)
        }

})



module.exports = router;