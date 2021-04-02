import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, displayName, email } = loggedInUser;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://radiant-stream-43053.herokuapp.com/orders?email=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])

    return (
        <div>
            <h1 className='text-center'>Welcome! <strong>{name || displayName}</strong></h1>
            <h5 className='text-center'>Email: {email}</h5>
            <h3 className='text-center'>You have: {orders.length} order</h3>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Purchase Date</th>
                    </tr>
                </thead>

                {
                    orders.map(pd =>

                        <tbody key={pd._id}>
                            <tr>
                                <td scope="col">{pd.name}</td>
                                <td scope="col">{pd.productName}</td>
                                <td scope="col">$ {pd.price}</td>
                                <td scope="col">{(new Date(pd.date).toDateString('dd/MM/yyyy'))}</td>
                            </tr>
                        </tbody>

                    )
                }

            </table>
        </div>
    );
};

export default Orders;