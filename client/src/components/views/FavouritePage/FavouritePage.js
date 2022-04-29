import React, { useEffect, useState } from 'react'
import './FavouritePage.css';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';
import { Popover } from 'antd';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {

        fetchFavoredMovie()
       
    }, [])


    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert("ERROR");
                }
            })
    }



    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom: localStorage.getItem('userId') 
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert("ERROR")
                }
            })
     console.log(userFrom)

    }


    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?

                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"}

                
            </div>
        )
                

        return  <tr key={index}>

                <td>{favorite.movieTitle}</td>
                
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
                


            {/* <td>{favorite.movieRunTime} mins</td> */}

        </tr>
    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        {/* <th>Movie RunTime</th> */}
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>


                    {renderCards}


                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage