import React, { useEffect, useState } from 'react'
import { Api } from '../../../providers/api';
import '../../Product/Modal.css';
import { iProductTypeList } from '../../../interfaces/Products/iProductTypeList';
import { IProductsEdit } from '../../../interfaces/Products/IProductsEdit';
import { toast } from 'react-toastify';

export type createProps = {
    showEdit: boolean;
    onCancel: () => void;
    handlerError: (errorMsg: string) => void;
    handlerSuccess: (successMsg: string) => void;
    currentProduct: number;
    dataType: iProductTypeList[];
}

function Edit(props: createProps) {

    const getProductById = async () => {
        if (props.currentProduct != 0) {
            await Api.get("Products/" + props.currentProduct)
                .then(response => {
                    setProductInfoSelected({ id: response.data.id, name: response.data.name, price: response.data.price, quantity: response.data.quantity, description: response.data.description, productTypeId: response.data.productTypeId });
                }).catch(error => {
                    console.log(error);
                })
        }
    }


    // Criar um  getType para colocar o id e receber o type
    const [dataType, setDataType] = useState<iProductTypeList[]>([]);
    const requestGetType = async () => {
        await Api.get("ProductType/id:int")
            .then(response => {
                setDataType(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const [productInfoSelected, setProductInfoSelected] = useState<IProductsEdit>(new IProductsEdit());

    const editProduct = async () => {

        if (productInfoSelected.description == "" || productInfoSelected.name == "" || productInfoSelected.price == null || productInfoSelected.quantity.toString() == "" || productInfoSelected.productTypeId.toString() == "") {
            toast.error("Please, fill  all fields!");
            return;
        }

        const price = productInfoSelected.price.toString();
        if (price.includes(',')) {
            const priceReplaced = price;
            productInfoSelected.price = priceReplaced.replace(',', '.');
        }

        if (isNaN(parseFloat(productInfoSelected.price))) {
            toast.error("Price must be a number!");
            return;
        }

        if (productInfoSelected.quantity.includes(',') || productInfoSelected.quantity.includes('.')) {
            toast.error("Quantity must be a integer number.");
            return;
        }

        if (isNaN(parseInt(productInfoSelected.quantity))) {
            toast.error("Quantity must be a number");
            return;
        }

        parseInt(productInfoSelected.quantity);


        await Api.put("Products/" + props.currentProduct, productInfoSelected)
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
    }, [props.currentProduct]);

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
                                            <input type="text" id="name" name="name" value={productInfoSelected.name} onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, name: e.target.value,
                                            })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="description">Description:</label>
                                            <input type="text" id="description" name="description" value={productInfoSelected.description} onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, description: e.target.value,
                                            })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="quantity">Quantity:</label>
                                            <input type="text" id="quantity" name="quantity" value={productInfoSelected.quantity} onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, quantity: e.target.value,
                                            })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="price">Price:</label>
                                            <input type="text" id="price" name="price" value={productInfoSelected.price} onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, price: e.target.value,
                                            })} />
                                        </div>
                                        <div className="modalItem">
                                            <label htmlFor="type">Type:</label>
                                            <select name="productTypeId" onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, productTypeId: parseInt(e.target.value),
                                            })}>
                                                {dataType.map(productType => (
                                                    (productInfoSelected.productTypeId == productType.productTypeId) ?
                                                        <option key={productType.productTypeId} defaultValue={productInfoSelected.id}>{productType.type}</option>
                                                        :
                                                        <option key={productType.productTypeId} value={productType.productTypeId}>{productType.type}</option>

                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modalBtns">
                                        <button className="btn createNew" onClick={() => editProduct()}>Save</button>
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