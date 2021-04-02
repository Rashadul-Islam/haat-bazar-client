import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Checkout.css';

const Checkout = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`https://radiant-stream-43053.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);

    const { productName, price ,quantity } = product;
    const {isSignedIn,name,displayName,email}=loggedInUser;

    const handleOrder=()=>{
        const date= new Date();
        const user={isSignedIn: isSignedIn,name:name||displayName, email:email}
        const orderedProduct={productName:productName,price:price}
        const newOrder= {...user,...orderedProduct, date:date}
        console.log(newOrder)
        fetch('https://radiant-stream-43053.herokuapp.com/addOrder', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(newOrder)
        })
        .then(res=>res.json())
        .then(data=>{
            alert('Successfully Ordered !!!!');
        })
    }

    return (
        <div>
            <h3 className='text-center pt-3 mb-5'>Checkout</h3>
            <table className="table table-hover" id='table-style'>
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{productName}</td>
                        <td className='px-5'>{quantity}</td>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td> </td>
                        <td>${price}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleOrder} type="button" className="btn btn-success btn-style">Checkout</button>
        </div>
    );
};

export default Checkout;