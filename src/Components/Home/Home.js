import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
const override = css`
  display: block;
  margin-top: 15%;
  border-color: red;
`;

const Home = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("orange");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://radiant-stream-43053.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [])
    return (
        <div className="row pb-5 justify-content-center">
            {
                products.map(product => <Product product={product} key={product._id}></Product>)
            }
            <CircleLoader color={color} loading={loading} css={override} size={60} />
        </div>
    );
};

export default Home;