import React, { useEffect, useState } from 'react'
import { Api } from '../../../providers/api';
import '../../Product/Modal.css';
import { iProductTypeList } from '../../../interfaces/Products/iProductTypeList';
import { IProductsTypeEdit } from '../../../interfaces/ProductsType/IProductsTypeEdit';

export type createProps = {
    showEdit: boolean;
    onCancel: () => void;
    handlerError: (errorMsg: string) => void;
    handlerSuccess: (successMsg: string) => void;
    currentProduct: number;
}

function Edit(props: createProps) {

    const getTypeById = async () => {
        if (props.currentProduct != 0) {
            await Api.get("ProductType?page=1&entries=1&search=" + props.currentProduct)
                .then(response => {
                    setProductInfoSelected({productTypeId: response.data.productType[0].productTypeId, type: response.data.productType[0].type});
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    const [productInfoSelected, setProductInfoSelected] = useState<IProductsTypeEdit>(new IProductsTypeEdit());

    const inputProductData = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProductInfoSelected({
            ...productInfoSelected, [name]: value,
        });
    }


    const editProduct = async () => {
        await Api.put("ProductType/" + props.currentProduct, productInfoSelected)
            .then(response => {
                if(response.data.error == true){
                    props.handlerError("The Type: " + productInfoSelected.type + " already exists");
                  }else{
                    props.handlerSuccess("Type edited successfully!");
                    props.onCancel();
                  }
                  
            }).catch(error => {
                props.handlerError("We were unable to edit the type!");
                console.log(error);
            })
    }
    useEffect(() => {
        getTypeById();
    }, [props.currentProduct]);

    return (
        <div>
            {
                props.showEdit ?
                    <div>
                        {
                            <div className="modalWindow">
                                <div className="containerModal">
                                    <div className="modalTitle"><h3>Edit Type - {productInfoSelected.type}</h3></div>
                                    <div className="modalBody">
                                        <div className="modalItem">
                                            <label htmlFor="type">Type:</label>
                                            <input type="text" id="type" name="type" value={productInfoSelected.type} onChange={(e) => setProductInfoSelected({
                                                ...productInfoSelected, type: e.target.value,
                                            })} />
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