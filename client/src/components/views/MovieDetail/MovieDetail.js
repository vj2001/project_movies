import React, { useEffect, useState } from 'react'
import { Row, Button } from 'antd';
import axios from 'axios';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../commons/GridCards';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import Favorite from './sections/Favorite';
import Comments from './sections/Comments';
import Youtube from 'react-youtube';

function MovieDetail(props) {

    const movieId = props.match.params.movieId
    const [trailertoggler,settrailertoggler] = useState(false);
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)
    const [Trailer,setTrailer] = useState();
    const movieVariable = {
        movieId: movieId
    }

    useEffect(async() => {


        let Trailerinfo = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
        const res = await axios.get(Trailerinfo);
        const len= res.data.results.length;
        setTrailer(res.data.results[0].key);
        for(var i=0;i<len;i++)
        {
            if(res.data.results[i].type == 'Trailer')
            setTrailer(res.data.results[i].key);
        }

        
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        
        fetchDetailInfo(endpointForMovieInfo)

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1
        }


    };

    useEffect(()=>{

    },[Trailer]);

    const watchTrailer = async()=>{
        settrailertoggler(!trailertoggler);
     
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>



                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor Names </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={watchTrailer}>Watch Trailer</Button>
                </div>

                
                    {
                        trailertoggler && <Youtube videoId={Trailer} opts={opts}/>
                    }
                



                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards
                                    characterName={cast.name}
                                />)) :
                                <div>loading...</div>
                        }
                    </Row>
                }
                <br />
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
            </div>

        </div>
    )
}

export default MovieDetail

