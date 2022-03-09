import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function App() {

  // API Connection
  const urlAPI = "https://localhost:44384/api/Products";

  const [data, setData] = useState([]);
  // Create the state of selectedProduct
  const [selectedProduct, setSelectedProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: ''
  });

  // Window Create
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [searchText, setsearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  // Save the data that the user will insert into the form
  // Uses setSelectedProduct to update the state
  const handleChange = e => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct, [name]: value
    });
  }

  const requestSearch = (searchValue) => {
    setsearchText(searchValue)
    // Verifies if input is empty
    if (searchText !== '') {
      // Input is not empty
      // Creates variable to save all the data that has the result of the searchValue
      const dataSearched = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchText.toLowerCase())
      })
      // 
      setFilteredResults(dataSearched)
    }
    else {
      setFilteredResults(data)
    }
  }

  const requestGet = async () => {
    await axios.get(urlAPI)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPost = async () => {
    delete selectedProduct.id;
    selectedProduct.price = parseInt(selectedProduct.price)
    await axios.post(urlAPI, selectedProduct)
      .then(response => {
        // Contact all the data receveid to send to the db
        setData(data.concat(response.data));
        setShowCreate(false);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestDelete = async (id) => {
    const urlWithId = (urlAPI + "/" + id);
    await axios.delete(urlWithId)
      .then(response => {
        // .filter will 'loop' the table where the id is different than the id that we just deleted
        setData(data.filter(product => product.id !== response.data));
        setShowDelete(false);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPut = async () => {
    const urlEdit = (urlAPI + "/" + selectedProduct.id);
    if (selectedProduct.name == "" || selectedProduct.description == "" || selectedProduct.price == "") {
      setShowError(true);
    } else {
      if (isNaN(selectedProduct.price)) {
        setShowError(true);
      } else {
        await axios.put(urlEdit, selectedProduct)
          .then(response => {
            data.map(product => {
              if (product.id === selectedProduct.id) {
                product.name = response.data.name;
                product.description = response.data.description;
                product.price = response.data.price;
              }
            });
            setShowEdit(false);
          }).catch(() => {
            setShowError(true);
          })
      }
    }
  }

  useEffect(() => {
    requestGet();
  });

  const selectProduct = (product, opcao) => {
    setSelectedProduct(product);
    if (opcao === "Delete") {
      setShowDelete(true);
    } else if (opcao === "Edit") {
      setShowEdit(true);
    }
  }

  return (
    <div className="App">

      <div className="tableContainer">
        <h1>Products</h1>
        <button className="btn createNew" onClick={() => setShowCreate(true)}>Create New Product</button>
        <input className="search" type="text" placeholder="Search..." name="search" onChange={(e) => requestSearch(e.target.value)} autoComplete="off" />
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
          {searchText.length > 0 ? (
            filteredResults.map((item) => {
              return (
                <tbody>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn edit-btn" onClick={() => selectProduct(item, "Edit")}>Edit</button>
                      <button className="btn delete-btn" onClick={() => selectProduct(item, "Delete")}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              )
            })
          ) : (
            <tbody>
              {data.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="btn edit-btn" onClick={() => selectProduct(product, "Edit")}>Edit</button>
                    <button className="btn delete-btn" onClick={() => selectProduct(product, "Delete")}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>


      {
        showCreate ?
          <div className="modalWindow">
            <div className="containerModal">
              <div className="modalTitle"><h3>Create New Product</h3></div>
              <div className="modalBody">
                <div className="modalItem">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="modalItem">
                  <label htmlFor="description">Description:</label>
                  <input type="text" id="description" name="description" onChange={handleChange} />
                </div>
                <div className="modalItem">
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" onChange={handleChange} />
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew" onClick={() => requestPost()}>Create</button>
                <button className="btn cancelBtn" onClick={() => setShowCreate(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }

      {
        showDelete ?
          <div className="modalWindow">
            <div className="containerModal">
              <div className="modalTitle"><h3>Delete Product</h3></div>
              <div className="modalBody">
                <div className="modalItem">
                  <span>Are you sure you want to delete the product with id: {selectedProduct && selectedProduct.id}</span>
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew" onClick={() => requestDelete(parseInt(selectedProduct.id))}>Delete</button>
                <button className="btn cancelBtn" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }

      {
        showEdit ?
          <div className="modalWindow">
            <div className="containerModal">
              <div className="modalTitle"><h3>Edit Product - {selectedProduct.id}</h3></div>
              <div className="modalBody">
                <div className="modalItem">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={selectedProduct.name} onChange={handleChange} />
                </div>
                <div className="modalItem">
                  <label htmlFor="description">Description:</label>
                  <input type="text" id="description" name="description" value={selectedProduct.description} onChange={handleChange} />
                </div>
                <div className="modalItem">
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" value={selectedProduct.price} onChange={handleChange} />
                </div>
                <div className="modalItem">
                  {
                    showError ?
                      <p className="error">* Please, fill all fields.</p>
                      : null
                  }
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew" onClick={() => requestPut(parseInt(selectedProduct.id))}>Save</button>
                <button className="btn cancelBtn" onClick={() => setShowEdit(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }
    </div>
  );
}

export default App;
