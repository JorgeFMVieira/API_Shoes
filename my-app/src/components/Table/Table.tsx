import { iProductsList } from '../../interfaces/iProductsList';
import { ProductService } from '../../services';
import React, { useState, useEffect } from 'react';
import './Table.css';
import { stringify } from 'querystring';

function Table() {

    const [data, setData] = useState<iProductsList[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [entries, setEntries] = useState(5);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("");

    const service = new ProductService();

    const thead = [
        {
            name: "Name"
        },
        {
            name: "Description"
        },
        {
            name: "Type"
        },
        {
            name: "Quantity"
        },
        {
            name: "Price"
        }
    ];


    function CheckPages(): JSX.Element {
        if (currentPage <= 1 && currentPage + 1 > totalPages) {
            return <div className="btn-Page">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled>Previous</button>
                <div className='currentPageInput'>{currentPage}</div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled>Next</button>
            </div>;
        }


        if (currentPage + 1 > totalPages) {
            return <div className="btn-Page">
                <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <div className='currentPageInput'>{currentPage}</div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled>Next</button>
            </div>;
        }

        if (currentPage <= 1) {
            return <div className="btn-Page">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled>Previous</button>
                <div className='currentPageInput'>{currentPage}</div>
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>;
        }

        if (currentPage) {
            return <div className="btn-Page">
                <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <div className='currentPageInput'>{currentPage}</div>
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>;
        }
        return <div>
            <p>Erro</p>
        </div>;
    }

    console.log("Info: ");
    console.log(totalPages);
    console.log(currentPage);
    console.log(data);

    useEffect(() => {
        service.getAll(currentPage, entries).then(result => {
            setTotalPages(result.pages);
            setCurrentPage(result.currentPage);
            setEntries(result.entries);
            setSearch(result.search);
            setSearchBy(result.searchBy);
            setData(result.products);
        });
    }, [currentPage, totalPages, search, searchBy]);

    return (
        <div className="tableContainer">
            <div className="content-table">
                <table>
                    <thead>
                        <tr>
                            {thead.map((item, index) => {
                                return <th key={index}>{item.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.description}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CheckPages />
            </div>
        </div>
    )
}

export default Table