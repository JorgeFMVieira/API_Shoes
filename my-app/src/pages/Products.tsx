import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { iProductsList } from '../interfaces/iProductsList';
import { ProductService } from '../services';
function Products() {

    // const [data, setData] = useState<iProductsList[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [entries, setEntries] = useState(5);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const service = new ProductService();

    service.getAll().then(result => {
        setTotalPages(result.pages);
        setCurrentPage(result.currentPage);
        setEntries(result.entries);
        setSearch(result.search);
        setSearchBy(result.searchBy);
        // setData(result.products);
    });

    console.log(totalPages);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ola</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {produtos.map(item => {
                        <tr key={item.id}>
                            <td>{item.name}</td>
                        </tr>
                    }} */}
                </tbody>
            </table>
        </div>
    )
}

export default Products