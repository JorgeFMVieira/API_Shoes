import React, { useEffect, useState } from 'react'
import { CreateProductTypeDTO } from '../../../Models/ProductsType/CreateProductTypeDTO';
import { Api } from '../../../providers/api';
import '../../Product/Modal.css';
import { iProductsTypeList } from '../../../interfaces/ProductsType/iProductsTypeList';

export type createProps = {
    show: boolean;
    onCancel: () => void;
    handlerError: (errorMsg: string) => void;
    handlerSuccess: (successMsg: string) => void;
}

function Create(props: createProps) {

    const [productType, setProduct] = useState<CreateProductTypeDTO>(new CreateProductTypeDTO());
    const [data, setData] = useState<iProductsTypeList[]>([]);



    const createProduct = async (productType: CreateProductTypeDTO) => {
        if (productType.type == "") {
            props.handlerError("Please, fill  all fields!");
            return;
        }


        await Api.post('ProductType', { ...productType })
            .then(response => {
                if (response.data.productTypeId != 0) {
                    props.handlerSuccess("Product created successfully!");
                    setData(data.concat(response.data));
                } else {
                    props.handlerError("A type with the name " + response.data.type + " already exists!");
                }
            }).catch(error => {
                props.handlerError("We weren´t able to create the product.");
                console.log(error);
            })
        setProduct(new CreateProductTypeDTO());

        props.onCancel();
    }

    useEffect(() => {

    }, [productType]);

    return (
        <div>
            {
                props.show ?
                    <div>
                        {
                            <div className="modalWindow">
                                <div className="containerModal">
                                    <div className="modalTitle"><h3>Create New Type</h3></div>
                                    <div className="modalBody">
                                        <div className="modalItem">
                                            <label htmlFor="type">Type:</label>
                                            <input type="text" id="type" name="type" onChange={(e) => setProduct({ ...productType, type: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="modalBtns">
                                        <button className="btn createNew" onClick={() => createProduct(productType)}>Create</button>
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