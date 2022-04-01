import React from 'react'
import '../../Product/Modal.css';
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
          await Api.delete('ProductType/' + props.currentProduct)
              .then(response => {
                  props.handlerSuccess("Type deleted successfully!");
                  props.onCancel();
              }).catch(error => {
                  props.handlerError("We were unable to delete the type!");
                  console.log(error);
                  props.onCancel();
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
                  <div className="modalTitle"><h3>Delete Type</h3></div>
                  <div className="modalBody">
                    <div className="modalItem">
                      <span>Are you sure you want to delete the type?</span>
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