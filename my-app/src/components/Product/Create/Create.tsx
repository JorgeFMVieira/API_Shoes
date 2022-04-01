import React, { useEffect, useState } from 'react'
import { CreateProductDTO } from '../../../Models/Products/CreateProductDTO';
import { iProductsList } from '../../../interfaces/iProductsList';
import { Api } from '../../../providers/api';
import '../../Product/Modal.css';
import { iProductTypeList } from '../../../interfaces/iProductTypeList';

export type createProps = {
    show: boolean;
    onCancel: () => void;
    handlerError: (errorMsg: string) => void;
    handlerSuccess: (successMsg: string) => void;
}

function Create(props: createProps) {

    const [product, setProduct] = useState<CreateProductDTO>(new CreateProductDTO());
    const [data, setData] = useState<iProductsList[]>([]);

    const [dataType, setDataType] = useState<iProductTypeList[]>([]);
    const requestGetType = async () => {
        await Api.get("ProductType/id:int")
            .then(response => {
                setDataType(response.data);
            }).catch(error => {
                console.log(error);
            })
    }



    const createProduct = async (product: CreateProductDTO) => {
        if (product.name == "" || product.description == "" || product.price == "" || product.quantity.toString() == "" || product.productTypeId == 0) {
            props.handlerError("Please, fill  all fields!");
            return;
        }

        if (product.price.includes(',')) {
            const priceReplaced = product.price;
            product.price = priceReplaced.replace(',', '.');
        }

        if (isNaN(parseFloat(product.price))) {
            props.handlerError("Price must be a number!");
            return;
        }

        if (isNaN(product.quantity)) {
            props.handlerError("Quantity must be a number!");
            return;
        }


        await Api.post('Products', { ...product })
            .then(response => {
                props.handlerSuccess("Product created successfully!");
                setData(data.concat(response.data));
            }).catch(error => {
                props.handlerError("We weren´t able to create the product.");
                console.log(error);
            })
        setProduct(new CreateProductDTO());

        props.onCancel();
    }

    useEffect(() => {
        requestGetType();
    }, [product]);

    return (
        <div>
            {
                props.show ?
                    <div>
                        {
                            <div className="modalWindow">
                                <div className="containerModal">
                                    <div className="modalTitle"><h3>Create New Product</h3></div>
                                    <div className="modalBody">
                                        <div className="modalItem">
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" id="name" name="name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="description">Description:</label>
                                            <input type="text" id="description" name="description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="quantity">Quantity:</label>
                                            <input type="text" id="quantity" name="quantity" onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="price">Price:</label>
                                            <input type="text" id="price" name="price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="productTypeId">Type:</label>
                                            <select name="productTypeId" id="productTypeId" onChange={(e) => setProduct({ ...product, productTypeId: parseInt(e.target.value) })}>
                                                <option defaultValue="Choose an Option" hidden>Choose an Option</option>
                                                {dataType.map((productType) => (
                                                    <option key={productType.id} value={productType.id}>{productType.type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modalBtns">
                                        <button className="btn createNew" onClick={() => createProduct(product)}>Create</button>
                                        <button className="btn cancelBtn" onClick={() => props.onCancel()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    : null
            }
        </div>
    )
}

export default Create