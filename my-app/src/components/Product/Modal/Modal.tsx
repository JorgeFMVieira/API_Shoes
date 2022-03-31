import React, { useState } from 'react'
import './Modal.css'
import { ProductService } from '../../../services';
import { iProductsList } from '../../../interfaces/iProductsList';
import { CreateProductDTO } from '../../../Models/Products/CreateProductDTO';
import { Api } from '../../../providers/api';
import axios from 'axios';

export type dadosCreate = {
    choose: string;
    openModal: any;
}

// service.getAll(currentPage, entries, searchBy, search).then(result => {
//     setTotalPages(result.pages);
//     setCurrentPage(result.currentPage);
//     setEntries(result.entries);
//     setSearchBy(result.searchBy);
//     setData(result.products);
//     if (result.search === null) {
//         setSearch("");
//     }
// });


function Modal(props: dadosCreate) {
    const [product, setProduct] = useState<CreateProductDTO>(new CreateProductDTO());
    const [data, setData] = useState<iProductsList[]>([]);

    const service = new ProductService();


    const createProduct = async(product : CreateProductDTO) => {
        await Api.post('Products', { ...product })
            .then(response => {
                setData(data.concat(response.data));
            }).catch(error => {
                console.log(error);
            })
        setProduct(new CreateProductDTO());

        props.openModal("close");

        const page = 1;
        const entries = 5;
        const searchBy = "all";
        const search = "";
        // service.getAll('Products?page=' + page + '&entries=' + entries + '&searchBy=' + searchBy + '&search=' + search);
    }

    return (
        <div>
            {
                props.choose == "create" ?
                    <div className="modalWindow">
                        <div className="containerModal">
                            <div className="modalTitle"><h3>Create New Product</h3></div>
                            <div className="modalBody">
                                <div className="modalItem">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" onChange={(e) => setProduct({...product, name: e.target.value})} />
                                </div>
                                <div className="modalItem">
                                    <label htmlFor="description">Description:</label>
                                    <input type="text" id="description" name="description" onChange={(e) => setProduct({...product, description: e.target.value})} />
                                </div>
                                <div className="modalItem">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input type="text" id="quantity" name="quantity" onChange={(e) => setProduct({...product, quantity: parseInt(e.target.value)})} />
                                </div>
                                <div className="modalItem">
                                    <label htmlFor="price">Price:</label>
                                    <input type="text" id="price" name="price" onChange={(e) => setProduct({...product, price: parseInt(e.target.value)})} />
                                </div>
                                <div className="modalItem">
                                    <label htmlFor="type">Type:</label>
                                    <input type="text" id="productTypeId" name="productTypeId" onChange={(e) => setProduct({...product, productTypeId: parseInt(e.target.value)})} />
                                </div>
                            </div>
                            <div className="modalBtns">
                                <button className="btn createNew" onClick={() => createProduct(product)}>Create</button>
                                <button className="btn cancelBtn" onClick={() => props.openModal("close")}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default Modal