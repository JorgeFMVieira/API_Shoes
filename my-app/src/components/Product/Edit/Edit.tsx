import React, { useEffect, useState } from 'react'
import { CreateProductDTO } from '../../../Models/Products/CreateProductDTO';
import { iProductsList } from '../../../interfaces/iProductsList';
import { Api } from '../../../providers/api';
import '../../Product/Modal.css';
import { iProductTypeList } from '../../../interfaces/iProductTypeList';
import { IProductsEdit } from '../../../interfaces/IProductsEdit';

export type createProps = {
    showEdit: boolean;
    onCancel: () => void;
    handlerError: (errorMsg: string) => void;
    handlerSuccess: (successMsg: string) => void;
    currentProduct: number;
}

function Edit(props: createProps) {

    const [product, setProduct] = useState([]);

    const getProductById = async () => {
        if (props.currentProduct != 0) {
            await Api.get("Products/" + props.currentProduct)
                .then(response => {
                    setProduct(response.data);
                    console.log(product);
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    const [dataType, setDataType] = useState<iProductTypeList[]>([]);
    const requestGetType = async () => {
        await Api.get("ProductType/id:int")
            .then(response => {
                setDataType(response.data);
                console.log(dataType);
            }).catch(error => {
                console.log(error);
            })
    }

    const [productInfoSelected, setProductInfoSelected] = useState({
        id: '',
        name: '',
        description: '',
        quantity: '',
        price: '',
        productTypeId: ''
    });

    const inputProductData = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProductInfoSelected({
            ...productInfoSelected, [name]: value
        });
    }


    const editProduct = async () => {
        await Api.put("Products/" + props.currentProduct, product)
            .then(response => {
                props.handlerSuccess("Product edited successfully!");
                props.onCancel();
            }).catch(error => {
                props.handlerError("We were unable to edit the product!");
                console.log(error);
            })
    }

    useEffect(() => {
        requestGetType();
        getProductById();
    }, [props.currentProduct, product]);

    return (
        <div>
            {
                props.showEdit ?
                    <div>
                        {
                            <div className="modalWindow">
                                <div className="containerModal">
                                    <div className="modalTitle"><h3>Edit Product - {productInfoSelected.id}</h3></div>
                                    <div className="modalBody">
                                        <div className="modalItem">
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" id="name" name="name" value={productInfoSelected.name} onChange={inputProductData} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="description">Description:</label>
                                            <input type="text" id="description" name="description" value={productInfoSelected.description} onChange={inputProductData} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="quantity">Quantity:</label>
                                            <input type="text" id="quantity" name="quantity" value={productInfoSelected.quantity} onChange={inputProductData} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="price">Price:</label>
                                            <input type="text" id="price" name="price" value={productInfoSelected.price} onChange={inputProductData} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="type">Type:</label>
                                            <select name="productTypeId" onChange={inputProductData}>
                                                <option key="1" defaultValue={productInfoSelected.id} hidden>{productInfoSelected.productTypeId}</option>
                                                {dataType.map((productType, index) => (
                                                    <option key={index} value={productType.id}>{productType.type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modalBtns">
                                        <button className="btn createNew" onClick={() => editProduct()}>Create</button>
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

export default Edit