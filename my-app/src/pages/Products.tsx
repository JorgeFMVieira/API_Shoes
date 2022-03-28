import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from '../components/Table/Table';
import { useProduct } from '../hooks';

function Products() {

    const { products, getProducts } = useProduct();
  
    useEffect(() => {
      getProducts();
    }, [getProducts]);

    console.log(products);

    return (
        <div>
            <Table items={products} />
        </div>
    )
}

export default Products