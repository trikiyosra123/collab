import React, { useEffect, useState } from 'react';

import {
    Row,
    Layout,
    Spin,
    Alert,
    Modal,
    Typography
} from 'antd';
import 'antd/dist/antd.css';
import MovieDetail from '../components/MovieDetail';
import SearchBox from "../components/searchBox";
import ColCardBox from '../components/ColCardBox';
import AddToFavourites from '../components/AddToFavourites';
import { useStateValue } from "../StateProvider";

const API_KEY = '9846641d';
const { Header, Content } = Layout;
const TextTitle = Typography.Title;


const Loader = () => (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <Spin />
    </div>
)




function Home() {


    const [{ user }] = useStateValue();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('adventure');
    const [activateModal, setActivateModal] = useState(false);
    const [detail, setShowDetail] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);


    const playlist = JSON.parse(localStorage.getItem("playlist"));
    const [PlayList, setPlayList] = useState(playlist);

    useEffect(() => {

        setLoading(true);
        setError(null);
        setData(null);

        // Base
        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                if (response.Response === 'False') {
                    setError(response.Error);
                }
                else {
                    console.log(response.Search)
                    setData(response.Search);
                }

                setLoading(false);
            })
            .catch(({ message }) => {
                setError(message);
                setLoading(false);
            })

    }, [q]);



    return (
        <Layout className="layout">
            <Header style={{ background: "#00613C", marginBottom: "20px" }}>
                <span style={{ color: '#ffff', marginTop: '10px', fontSize: '20px', float: 'left', display: 'flex', justifyContent: 'center' }} level={1}>
                    <img style={{ height: "50px", width: "50px", marginLeft: "100px", marginRight: "10px", borderRadius: "20px" }} src={user.photoURL} alt=""></img>
                    {user.displayName}
                </span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <TextTitle style={{ color: '#ffff', marginTop: '14px', marginRight: "300px", alignItems: "center" }} level={7}>Entertainment Hub {" "}  </TextTitle>
                </div>
            </Header>
            <SearchBox style={{ marginTop: '40px' }} searchHandler={setQuery} />
            <br />
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: 'black', padding: 24, minHeight: 0 }}>

                    <TextTitle style={{ color: '#fff', margin: '0px 150px' }} level={6}>Favourites</TextTitle>
                    <Row gutter={16} type="flex" justify="center">
                        {PlayList.length === 0 ? (<span style={{ color: 'white', margin: '0px 150px', justifyContent: 'center', alignItems: 'center' }} >
                            Add Your Favourite Movies </span>) : PlayList.map((result, index) => (
                                <AddToFavourites
                                    ShowDetail={setShowDetail}
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    key={index}
                                    {...result}
                                />
                            ))}
                    </Row>
                </div>
            </Content>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: 'black', padding: 24, minHeight: 280 }}>

                    <TextTitle style={{ color: '#fff', margin: '0px 150px' }} level={6}>Movies</TextTitle>
                    <Row gutter={16} type="flex" justify="center">
                        {loading &&
                            <Loader />
                        }

                        {error !== null &&
                            <div style={{ margin: '20px 0' }}>
                                <Alert message={error} type="error" />
                            </div>
                        }

                        {data !== null && data.length > 0 && data.map((result, index) => (
                            <ColCardBox
                                ShowDetail={setShowDetail}
                                DetailRequest={setDetailRequest}
                                ActivateModal={setActivateModal}
                                key={index}
                                {...result}
                                setPlayList={setPlayList}
                            />
                        ))}
                    </Row>
                </div>
                <Modal
                    title='Detail'
                    centered
                    visible={activateModal}
                    onCancel={() => setActivateModal(false)}
                    footer={null}
                    width={800}
                >
                    {detailRequest === false ?
                        (<MovieDetail {...detail} />) :
                        (<Loader />)
                    }
                </Modal>
            </Content>

        </Layout>
    )
}

export default Home