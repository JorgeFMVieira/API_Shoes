import React from 'react'
import './Delete.css'
import { Api } from '../../../providers/api';

export type deleteProps = {
  showDelete: boolean;
  onCancel: () => void;
  currentProduct: number;    
  handlerError: (errorMsg: string) => void;
  handlerSuccess: (successMsg: string) => void;
}

function Delete(props: deleteProps) {
  
      const deleteProduct = async () => {
          await Api.delete('Products/' + props.currentProduct)
              .then(response => {
                props.handlerSuccess("Product deleted successfully!");
                  props.onCancel();
              }).catch(error => {
                  props.handlerError("We were unable to delete the product!");
                  console.log(error);
              })
      }


  return (
    <div>
      {
        props.showDelete ?
          <div>
            {
              <div className="modalWindow">
                <div className="containerModal">
                  <div className="modalTitle"><h3>Delete Product</h3></div>
                  <div className="modalBody">
                    <div className="modalItem">
                      <span>Are you sure you want to delete the product?</span>
                    </div>
                  </div>
                  <div className="modalBtns">
                    <button className="btn createNew" onClick={() => deleteProduct()}>Delete</button>
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

export default Delete