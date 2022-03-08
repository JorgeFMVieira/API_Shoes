import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  // API Connection
  const urlAPI = "https://localhost:44384/api/Products";
  
  const [data, setData] = useState([]);

  const requestGet = async() =>{
      await axios.get(urlAPI)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    requestGet();
  });

  // Window Create
  const [show, setShow] = useState(false);

  return (
    <div className="App">
        <div className="tableContainer">
            <h1>Products</h1>
            <button className="btn createNew" onClick={()=>setShow(true)}>Create New Product</button>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                        <button className="btn edit-btn">Edit</button>
                        <button className="btn delete-btn">Delete</button>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
        </div>


        {
          show?
          <div className="modalWindow">
            <div className="containerModal">
                  <div className="modalTitle"><h3>Create New Product</h3></div>
                  <div className="modalBody">
                      <div className="modalItem">
                          <label htmlFor="id">Id:</label>
                          <input type="text" id="id" />  
                      </div>
                      <div className="modalItem">
                          <label htmlFor="name">Name:</label>
                          <input type="text" id="name" />  
                      </div>
                      <div className="modalItem">
                          <label htmlFor="description">Description:</label>
                          <input type="text" id="description" />  
                      </div>
                      <div className="modalItem">
                          <label htmlFor="price">Price:</label>
                          <input type="text" id="price" />  
                      </div>
                  </div>
                  <div className="modalBtns">
                      <button className="btn createNew">Create</button>
                      <button className="btn cancelBtn" onClick={()=>setShow(false)}>Cancel</button>
                  </div>
            </div>
        </div>:null
        }
    </div>
  );
}

export default App;
