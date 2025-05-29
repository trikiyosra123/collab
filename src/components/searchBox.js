import React from 'react';
import {
    Input,
    Row,
    Col
} from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;


function searchBox({ searchHandler }) {
  return (
    <Row>
    <Col span={12} offset={6}>
        <Search
            placeholder="Search For Movies, Series, Genre"
            enterButton="Search"
            size="large"
            onSearch={value => searchHandler(value)}
        />
    </Col>
</Row>
  )
}

export default searchBox