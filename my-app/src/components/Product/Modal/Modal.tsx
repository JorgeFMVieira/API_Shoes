import React, { useState } from 'react'
import './Modal.css'

function Modal({openModal}: any) {


    
    return (
        <div>
            <div className="modalWindow">
                <div className="containerModal">
                    <div className="modalTitle"><h3>Create New Product</h3></div>
                    <div className="modalBody">
                        <div className="modalItem">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div className="modalItem">
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="description" />
                        </div>
                        <div className="modalItem">
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" id="quantity" name="quantity" />
                        </div>
                        <div className="modalItem">
                            <label htmlFor="price">Price:</label>
                            <input type="text" id="price" name="price" />
                        </div>
                        <div className="modalItem">
                            <label htmlFor="type">Type:</label>
                            <select name="productTypeId">
                                <option key="1" defaultValue="Choose an option" hidden>Choose an option</option>
                            </select>
                        </div>
                    </div>
                    <div className="modalBtns">
                        <button className="btn createNew">Create</button>
                        <button className="btn cancelBtn" onClick={() => openModal("close")}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal