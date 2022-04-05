import { useState } from 'react';
import './StyleDefault.css';
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";
import Table from '../components/ProductType/Table/Table';
import Navbar from '../components/Navbar';

function ProductsType() {
    return (
        <div>
            <Navbar />
            <Table />
        </div>
    )
}

export default ProductsType