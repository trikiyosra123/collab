import React from 'react';

import {
    Row,
    Col,
    Card,
    Tag,
} from 'antd';
import 'antd/dist/antd.css';

const API_KEY = '70a1359b';

const { Meta } = Card;


function AddToFavourites({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) {

    const RemoveFromPlaylist = () => {
        const playlist = JSON.parse(localStorage.getItem("playlist"));
        const newPlayList = playlist.filter((fav) => fav.imdbID !== imdbID)
        localStorage.setItem("playlist", JSON.stringify(newPlayList));

    }

    const clickHandler = () => {

        // Display Modal and Loading Icon
        ActivateModal(true);
        DetailRequest(true);

        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                DetailRequest(false);
                ShowDetail(response);
            })
            .catch(({ message }) => {
                DetailRequest(false);
            })
    }

    return (
        <Col style={{ margin: '20px 0px' }} className="gutter-row" span={5}>
            <div className="gutter-box">
                <Card
                    style={{ width: 235, padding: '5px', background: "rgba(0, 0, 0, 0.10)" }}
                    cover={
                        <img onClick={() => clickHandler()}
                            alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }

                >
                    <Meta style={{ background: '#fff', padding: "5px", border: '1px solid black', borderRadius: "6px" }}
                        title={Title}
                        description={false}
                    />
                    <Row style={{ marginTop: '10px' }} className="gutter-row">
                        <Col style={{ display: "flex" }}>
                            <Tag color="magenta">{Type}</Tag>
                            <button onClick={RemoveFromPlaylist} style={{ fontSize: "13px", border: '1px solid black', borderRadius: '5px', background: "rgb(255, 255, 255)" }}>Remove</button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Col>
    )
}

export default AddToFavourites