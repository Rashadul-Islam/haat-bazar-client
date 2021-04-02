import React from 'react';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Admin = () => {

    return (
        <div id="admin-nav">
            <div className='d-flex justify-content-center' id="bar-link">
                <Link className='link-style p-3' to='/manageProduct'><FontAwesomeIcon icon={faThLarge} /> Manage Product</Link>
                <Link className='link-style p-3' to='/addProduct'><FontAwesomeIcon icon={faPlus} /> Add Product</Link>
                <Link className='link-style p-3' to='/editProduct'><FontAwesomeIcon icon={faPencilAlt} /> Edit Product</Link>
            </div>
        </div>

    );
};

export default Admin;
