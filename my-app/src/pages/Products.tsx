import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProduct } from '../hooks';
import { Table } from '../Table/Table';

function Products() {

    const { products, getProducts } = useProduct();

  
    useEffect(() => {
      getProducts();
    }, [getProducts]);

  return (
    <div>
      <h1>Products</h1>

      <div>
        <Table products={products} />
      </div>
    </div>
  )
}

export default Products