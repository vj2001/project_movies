import React from 'react'
import { Descriptions, Badge } from 'antd';

function MovieInfo(props) {

    let { movie } = props;

    return (
        <Descriptions  style={{fontWeight:"bold"}} title="Movie Info" bordered>
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="Releasing Date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="Running Time">{movie.runtime} mins</Descriptions.Item>
            <Descriptions.Item label="status" span={1}>{movie.status}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
