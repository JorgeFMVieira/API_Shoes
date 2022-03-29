import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../components/Table/Table';

function Products() {

    return (
        <div>
            <Table />
        </div>
    )
}

export default Products