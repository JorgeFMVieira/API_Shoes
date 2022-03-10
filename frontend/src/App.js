import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  // API Connection
  const urlAPI = "https://localhost:44384/api/Products";

  const [productDB, setProductDB] = useState([]);
  // Create the state of productInfoSelected
  const [productInfoSelected, setProductInfoSelected] = useState({
    id: '',
    name: '',
    description: '',
    price: ''
  });

  // Window Create
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [searchText, setsearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);


  // Save the productDB that the user will insert into the form
  // Uses setProductInfoSelected to update the state
  const inputProductData = e => {
    const { name, value } = e.target;
    setProductInfoSelected({
      ...productInfoSelected, [name]: value
    });
  }

  const requestGet = async () => {
    await axios.get(urlAPI)
      .then(response => {
        setProductDB(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPost = async () => {
    delete productInfoSelected.id;
    productInfoSelected.price = parseInt(productInfoSelected.price)
    await axios.post(urlAPI, productInfoSelected)
      .then(response => {
        // Contact all the productDB receveid to send to the db
        setProductDB(productDB.concat(response.data));
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
        setProductDB(productDB.filter(product => product.id !== response.data));
        setShowDelete(false);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPut = async () => {
    const urlEdit = (urlAPI + "/" + productInfoSelected.id);
        await axios.put(urlEdit, productInfoSelected)
          .then(response => {
            productDB.map(product => {
              if (product.id === productInfoSelected.id) {
                product.name = response.data.name;
                product.description = response.data.description;
                product.price = response.data.price;
              }
            });
            setShowEdit(false);
          }).catch(error => {
            console.log(error);
          })
  }

  useEffect(() => {
    requestGet();
  });

  const selectProduct = (product, type) => {
    setProductInfoSelected(product);
    if (type == "Delete") {
      setShowDelete(true);
    } else if (type == "Edit") {
      setShowEdit(true);
    }
  }

  const requestSearch = (searchValue) => {
    setsearchText(searchValue)
    // Verifies if input is empty
    if (searchValue !== '') {
      // Input is not empty
      // Creates variable to save all the data that has the result of the searchValue
      const dataSearched = productDB.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredResults(dataSearched)
    }
    else {
      // Return normal data without search text
      setFilteredResults(productDB)
    }
  }

const i = 0;

  return (
    <div className="App">

      <div className="tableContainer">
        <h1>Products</h1>
        <button className="btn createNew" onClick={() => setShowCreate(true)}>Create New Product</button>
        <input className="search" type="text" placeholder="Search..." name="search" autoComplete="off" onInput={(e) => requestSearch(e.target.value)} />
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
          {searchText.length == 0 ? (
                        <tbody>
                        {productDB.map(product => (
                          <tr>
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
          ) : (
            filteredResults.map((item) => {
              return (
                <tbody>
                  <tr>
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
                  <input type="text" id="name" name="name" onChange={inputProductData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="description">Description:</label>
                  <input type="text" id="description" name="description" onChange={inputProductData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" onChange={inputProductData} />
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
                  <span>Are you sure you want to delete the product with id: {productInfoSelected.id}</span>
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn cancelBtn" onClick={() => requestDelete(parseInt(productInfoSelected.id))}>Delete</button>
                <button className="btn createNew" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }

      {
        showEdit ?
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
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" value={productInfoSelected.price} onChange={inputProductData} />
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew" onClick={() => requestPut(parseInt(productInfoSelected.id))}>Save</button>
                <button className="btn cancelBtn" onClick={() => setShowEdit(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }
    </div>
  );
}

export default App;
