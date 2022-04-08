import { useState } from 'react';
import './StyleDefault.css';
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";
import Table from '../components/ProductType/Table/Table';
import CheckRoutes from './Routes/CheckRoutes';

function ProductsType() {
    return (
        <div>
            <CheckRoutes />
            <Table />
        </div>
    )
}

export default ProductsType