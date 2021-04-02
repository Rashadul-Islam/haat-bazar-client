import React from 'react';
import { useHistory } from 'react-router';
import './product.css';

const Product = (props) => {
    const history = useHistory();
    const handleAddProduct = id => {
        history.push(`/checkout/${ id }`)
    }
    const { productName, weight, price, imageURL,_id } = props.product;
    return (
        <div className='d-flex justify-content-center col-md-4 mt-5'>
            <div className="card" id='card-style' style={{ width: '18rem', border: 'none' }}>
                <img className='card-img-top' src={imageURL} alt="" />
                <div className="card-body">
                    <h6>{productName}-{weight}</h6>
                    <br />
                    <div className='d-flex justify-content-between'>
                        <h4 className="font-weight-bold text-danger">${price}</h4>
                        <button onClick={() => handleAddProduct(_id)} type="button" className="btn btn-success">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;