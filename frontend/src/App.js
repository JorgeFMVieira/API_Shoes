import './App.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineSort } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // useEffect(() => {
  //   toast.success('I"m faisal from success!');
  //   toast.info('I"m faisal from info!');
  //   toast.error('I"m faisal from error!');
  // });

  // Window Create
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
    if(productInfoSelected.name == "" || productInfoSelected.description == "" || productInfoSelected.price == ""){
      toast.error('Please, fill  all fields!');
      return;
    }

    if(productInfoSelected.price.includes(',')){
      const priceReplaced = productInfoSelected.price.replace(',', '.');
      productInfoSelected.price = priceReplaced;
    }

    if(isNaN(productInfoSelected.price)){
      toast.error('The price has to be a number.');
      return;
    }

    productInfoSelected.price = parseFloat(productInfoSelected.price)
    await axios.post(urlAPI, productInfoSelected)
      .then(response => {
          setProductDB(productDB.concat(response.data));
          setShowCreate(false);
          setFilteredResults("");
          toast.success('A new product id the id ' + response.data.id + ' has been created!');
      }).catch(() => {
          toast.error('We weren´t able to create the product');
      });
  }

  const requestDelete = async (id) => {
    const urlWithId = (urlAPI + "/" + id);
    await axios.delete(urlWithId)
      .then(response => {
        // .filter will 'loop' the table where the id is different than the id that we just deleted
        setProductDB(productDB.filter(product => product.id !== response.data));
        setShowDelete(false);
        toast.success('The product with the id ' + id + ' was deleted');
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPut = async () => {
    if(productInfoSelected.name == "" || productInfoSelected.description == "" || productInfoSelected.price == ""){
      toast.error('Please, fill  all fields!');
      return;
    }

    if(productInfoSelected.price.toString().includes(',', 0)){
      const priceReplaced = productInfoSelected.price.replace(',', '.');
      productInfoSelected.price = priceReplaced;
    }

    if(isNaN(productInfoSelected.price)){
      toast.error('The price has to be a number.');
      return;
    }

    productInfoSelected.price = parseFloat(productInfoSelected.price)
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
        toast.success('The product with the id' + productInfoSelected.id + ' was edited');
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

  const [produto, setProduto] = useState([]);

  const requestFindById = async (searchId) => {
    const urlFind = (urlAPI + "/ProductById?id=" + searchId);
    await axios.get(urlFind)
      .then(response => {
        setShowErroNoId(false);
        setShowTable(true);
        if(searchId != ""){
          setTimeout(() => {
            toast.success('We found a product with the id ' + searchId);
          }, 1000);
        }
        if (searchId !== '') {
          setProduto(response.data);
          setFilteredResults(" ");
        } else {
          setFilteredResults("");
        }
      }).catch(() => {
        if (searchId == '') {
          setShowTable(true);
          setFilteredResults("");
        } else {
          setShowTable(false);
          setShowErroNoId(true);
          if(searchId != ""){
            toast.error('We didn´t find a product with the id ' + searchId);
          }
        }
      })
  }

  const requestFindByName = async (searchName) => {
    const urlFind = (urlAPI + "/ProductByName?name=" + searchName);
    await axios.get(urlFind)
      .then(response => {
        setShowErroNoId(false);
        setShowTable(true);
        if (searchName !== '') {
          setProduto(response.data);
          setFilteredResults(" ");
        } else {
          setFilteredResults("");
        }
      }).catch(() => {
        if (searchName == '') {
          setShowTable(true);
          setFilteredResults("");
        } else {
          setShowTable(false);
          setShowErroNoId(true);
        }
      })
  }

  const showHideFilter = () => {
    const ativo = 0;
    if (ativo == 0) {
      setShowFilter(true);
      ativo = 1;
    } else {
      setShowFilter(false);
      ativo = 0;
    }
  }

  const [showErroNoID, setShowErroNoId] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const [showFilter, setShowFilter] = useState(false);

  const [showInputId, setShowInputId] = useState(true);
  const [showInputName, setShowInputName] = useState(false);

  const closeFilter = useRef();

  // Detects clicks
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  // Outside Click
  // const handleClick = e => {
  //   if (!closeFilter.current.contains(e.target)) {
  //     setShowFilter(false);
  //     return;
  //   }
  // };

  return (
    <div className="App">
    <ToastContainer />
      <div className="tableContainer">
        <div className="tableHeader">
          <h1>Products</h1>
          <div className="filter">
            <MdOutlineSort className="iconFilterSearch" onClick={() => showHideFilter()} />
            {
              showFilter ?
                <div className="filterOptions" ref={closeFilter}>
                  <ul>
                    <li onClick={() => (setShowInputId(true), setShowInputName(false), setFilteredResults(""), setShowFilter(false))}>Id</li>
                    <li onClick={() => (setShowInputName(true), setShowInputId(false), setFilteredResults(""), setShowFilter(false))}>Name</li>
                  </ul>
                </div> : null
            }
          </div>
        </div>
        <button className="btn createNew" onClick={() => setShowCreate(true)}>Create New Product</button>
        {
          showInputId ?
            <input className="search" type="text" placeholder="Search ID..." name="searchId" autoComplete="off" onInput={(e) => requestFindById(e.target.value)} />
            : null
        }

        {
          showInputName ?
            <input className="search" type="text" placeholder="Search Name..." name="searchName" autoComplete="off" onInput={(e) => requestFindByName(e.target.value)} />
            : null
        }

        {
          showTable ?
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
              {filteredResults.length == 0 ? (
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
                <tbody>
                  {produto.map(product => (
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
              )}
            </table> : null
        }

        {
          showErroNoID ?
            <div className='errorFindId'>
              <p>We didn´t find a product with the that data.</p>
            </div> : null
        }
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

      {
        showSearch ?
          <div className="modalWindow">
            <div className="containerModal">
              <div className="modalTitle"><h3>Product - </h3></div>
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
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" />
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew">Save</button>
                <button className="btn cancelBtn">Cancel</button>
              </div>
            </div>
          </div> : null
      }
    </div>
  );
}

export default App;
