import './Products.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';

function Products() {
  // API Connection
  const [page, setPage] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);
  const [entriesPerTable, setEntriesPerTable] = useState(5);
  const [searchBy, setSearchBy] = useState("all");
  const [searchTable, setSearchTable] = useState("");
  const urlAPI = "https://localhost:44384/api/Products?page=" + page + "&entries=" + entriesPerTable + "&searchby=" + searchBy + "&search=" + searchTable;

  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState([]);

  const [productDB, setProductDB] = useState([]);

  // Window Create
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [filteredResults, setFilteredResults] = useState([]);


  const [produto, setProduto] = useState([]);

  const [showErroNoID, setShowErroNoId] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const [showInputId, setShowInputId] = useState(false);
  const [showInputName, setShowInputName] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [showNoProducts, setShowNoProducts] = useState(false);
  const [showBtnCreate, setShowBtnCreate] = useState(true);
  const [showSearchOption, setShowSearchOption] = useState(true);
  const [showEntries, setShowEntries] = useState(false);
  

  // Create the state of productInfoSelected
  const [productInfoSelected, setProductInfoSelected] = useState({
    id: '',
    name: '',
    description: '',
    quantity: '',
    price: '',
    productTypeId: ''
  });

  const [productTypeSelect, setProductTypeSelect] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    productTypeId: ''
  })

  // Save the productDB that the user will insert into the form
  // Uses setProductInfoSelected to update the state
  const inputProductData = e => {
    const { name, value } = e.target;
    setProductInfoSelected({
      ...productInfoSelected, [name]: value
    });
    console.log(productInfoSelected);
  }

  const productTypeData = e => {
    const { name, value } = e.target;
    setProductTypeSelect({
      ...productTypeSelect, [name]: value
    });
  }

  const [totalpages, setTotalPages] = useState(0);
  const [totalpagesFilter, setTotalPagesFilter] = useState(0);

  const requestGet = async () => {
    await axios.get(urlAPI)
      .then(response => {
        setData(response.data.products);
        setTotalPages(response.data.pages);
        setShowNoProducts(false);
        if(response.data.products.length == 0){
          setShowNoProducts(true);
        }
        setShowErroNoId(false);
        if(response.data.erro == "SearchError"){
          setShowNoProducts(true);
        }
      }).catch(() => {
        toast.error('Please contact an administrator!');
      });
  }

  const requestGetType = async () => {
    await axios.get("https://localhost:44384/api/ProductType/id:int")
        .then(response => {
          setDataType(response.data);
          if(response.data.length === 0){
            setShowTable(false);
          }else{
            setShowTable(true);
          }
        }).catch(error => {
          console.log(error);
        })
  }

  const requestPost = async () => {
    delete productTypeSelect.id;
    if (productTypeSelect.name == "" || productTypeSelect.description == "" || productTypeSelect.price == "") {
      toast.error('Please, fill  all fields!');
      return;
    }

    if (productTypeSelect.price.includes(',')) {
      const priceReplaced = productTypeSelect.price.replace(',', '.');
      productTypeSelect.price = priceReplaced;
    }

    productTypeSelect.price = parseFloat(productTypeSelect.price);

    if (isNaN(productTypeSelect.price)) {
      toast.error('The price has to be a number.');
      return;
    }

    if(isNaN(productTypeSelect.quantity)){
      toast.error('The quantity has to be a integer number.');
      return;
    }

    await axios.post(urlAPI, productTypeSelect)
      .then(response => {
        setProductDB(productDB.concat(response.data));
        setShowCreate(false);
        setFilteredResults("");
        toast.success('A new product with the name ' + response.data.name + ' has been created!');
        requestGet();
      }).catch(error => {
        toast.error('We weren´t able to create the product');
        console.log(error);
      });
  }

  const requestDelete = async (id) => {
    const urlWithId = ("https://localhost:44384/api/Products/" + id);
    await axios.delete(urlWithId)
      .then(response => {
        setShowDelete(false);
        toast.success('The product with the id ' + response.data.id + ' was deleted');
        if (response.data == true && data.length == 1) {
          if (page != 1) {
            setPage(page - 1);
          } else {
            setShowNoProducts(true);
          }
        }
        requestGet();
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPut = async () => {
    if (productInfoSelected.name == "" || productInfoSelected.description == "" || productInfoSelected.price == "") {
      toast.error('Please, fill  all fields!');
      return;
    }
    if (productInfoSelected.price.toString().includes(',', 0)) {
      const priceReplaced = productInfoSelected.price.replace(',', '.');
      productInfoSelected.price = priceReplaced;
    }
    if (isNaN(productInfoSelected.price)) {
      toast.error('The price has to be a number.');
      return;
    }

    productInfoSelected.price = parseFloat(productInfoSelected.price)

    setProductInfoSelected(productTypeSelect);
    console.log(productInfoSelected);

    const urlEdit = ("https://localhost:44384/api/Products/" + productInfoSelected.id);
    await axios.put(urlEdit, productInfoSelected)
      .then(response => {
        requestGet();
        setShowEdit(false);
        toast.success('The product with the name ' + productInfoSelected.name + ' was edited');
        console.log(productInfoSelected);
      }).catch(error => {
        console.log(error);
        console.log(productInfoSelected);
      })
  }

  const selectProduct = (product, type) => {
    setProductInfoSelected(product);
    if (type == "Delete") {
      setShowDelete(true);
    } else if (type == "Edit") {
      setShowEdit(true);
    }
  }

  const changeEntriesPerTable = async (e) => {
    await axios.get(urlAPI)
      .then(response => {
        setEntriesPerTable(e);
      }).catch(() => {
        setEntriesPerTable(5);
        toast.error('Please contact an administrator!');
      });
  }

  const changeOptionSearch = async (searchOption) => {
    if (searchOption == "name") {
      setShowInputName(true);
      setShowInputId(false);
      setShowSearchInput(false);
      setShowErroNoId(false);
      return;
    }

    if (searchOption == "all") {
      setShowSearchInput(true);
      setShowInputId(false);
      setShowInputName(false);
      setShowErroNoId(false);
      return;
    }
  }

    const [inputValue, setInputValue] = useState(page);

    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

  const setChoosePage = async (e) => {
    var pagina = parseInt(e);
    setInputValue(e);

    if(e.length == ""){
      setPage(page);
      return;
    }else{
      if(isNaN(pagina)){
        setPage(page);
        setInputValue(page);
        toast.error("The page number must be a number.");
        return;
      }else{
        if(pagina > totalpages){
          setInputValue(page);
          toast.error("The page limit is "+ totalpages + ".");
          return;
        }
  
        if(pagina < 1){
          setInputValue(1);
          toast.error("The page minium is 1.");
          return;
        }
  
        setPage(pagina);
        requestGet();
      }
    }
  }

  function CheckPages() {
    if (page <= 1 && page + 1 > totalpages) {
      return <div className="btn-Page">
        <button onClick={() => (setPage(page - 1), setInputValue(page -1))} disabled>Previous</button>
        <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} size="1" />
        <button onClick={() => (setPage(page + 1), setInputValue(page + 1))} disabled>Next</button>
      </div>;
    }


    if (page + 1 > totalpages) {
      return <div className="btn-Page">
        <button onClick={() => (setPage(page - 1), setInputValue(page -1))}>Previous</button>
        <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} size="1" />
        <button onClick={() => (setPage(page + 1), setInputValue(page + 1))} disabled>Next</button>
      </div>;
    }

    if (page <= 1) {
      return <div className="btn-Page">
        <button onClick={() => (setPage(page - 1), setInputValue(page -1))} disabled>Previous</button>
        <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} size="1" />
        <button onClick={() => (setPage(page + 1), setInputValue(page + 1))}>Next</button>
      </div>;
    }

    if (page) {
      return <div className="btn-Page">
        <button onClick={() => (setPage(page - 1), setInputValue(page -1))}>Previous</button>
        <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} size="1" />
        <button onClick={() => (setPage(page + 1), setInputValue(page + 1))}>Next</button>
      </div>;
    }
  }

  function CheckPagesFilter() {
    if (pageFilter <= 1 && pageFilter + 1 > totalpagesFilter) {
      return <div className="btn-Page">
        <button onClick={() => setPageFilter(pageFilter - 1)} disabled>Previous</button>
        <button className='btnCurrentPage'>{pageFilter}</button>
        <button onClick={() => setPageFilter(pageFilter + 1)} disabled>Next</button>
      </div>;
    }


    if (pageFilter + 1 > totalpagesFilter) {
      return <div className="btn-Page">
        <button onClick={() => setPageFilter(pageFilter - 1)}>Previous</button>
        <button className='btnCurrentPage'>{pageFilter}</button>
        <button onClick={() => setPageFilter(pageFilter + 1)} disabled>Next</button>
      </div>;
    }

    if (pageFilter <= 1) {
      return <div className="btn-Page">
        <button onClick={() => setPageFilter(pageFilter - 1)} disabled>Previous</button>
        <button className='btnCurrentPage'>{pageFilter}</button>
        <button onClick={() => setPageFilter(pageFilter + 1)}>Next</button>
      </div>;
    }

    if (pageFilter) {
      return <div className="btn-Page">
        <button onClick={() => setPageFilter(pageFilter - 1)}>Previous</button>
        <button className='btnCurrentPage'>{pageFilter}</button>
        <button onClick={() => setPageFilter(pageFilter + 1)}>Next</button>
      </div>;
    }
  }

  useEffect(() => {
    setPage(1);
    setInputValue(1);
  }, [entriesPerTable]);

  useEffect(() => {
    requestGet();
    requestGetType();
  }, [entriesPerTable, page, inputValue, searchBy, searchTable]);

  return (
    <div className="Products">
      <Nav />
      <ToastContainer />

      <div className="tableContainer">
        <div className="tableHeader">
          <h1>Products</h1>
        </div>
        {
  showTable ?
          <div>
            <button className="btn createNew" onClick={() => setShowCreate(true)}>Create New Product</button>

        <div className="searchItems">
          <div className="searchItems-Inputs">
            {
              showSearchInput ?
                <input className="search todo" type="search" placeholder="Search..." name="search" autoComplete="off" onChange={(e) => (setSearchBy("all"), setSearchTable(e.target.value))} />
                : null
            }

            {
              showInputName ?
                <input className="search soNome" type="search" placeholder="Search Name..." name="searchName" autoComplete="off" onChange={(e) => (setSearchBy("name"), setSearchTable(e.target.value))} />
                : null
            }
            {
              showSearchOption ?
              <select name="optionSearch" defaultValue={'all'} className="search search-options" onChange={(e) => changeOptionSearch(e.target.value)}>
                <option value="all">All</option>
                <option value="name">Name</option>
              </select>
              : null
            }
          </div>
            <select className="search todo" onInput={(e) => changeEntriesPerTable(e.target.value)} >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
        </div>
        

          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.type}</td>
                    <td>
                      <button className="btn edit-btn" onClick={() => selectProduct(product, "Edit")}>Edit</button>
                      <button className="btn delete-btn" onClick={() => selectProduct(product, "Delete")}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CheckPages />
          </div>
          </div>
          : null
        }

        {
          showNoProducts ?
            <div className='errorFindId'>
              <p>We didn´t find any products.</p>
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
                  <input type="text" id="name" name="name" onChange={productTypeData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="description">Description:</label>
                  <input type="text" id="description" name="description" onChange={productTypeData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="quantity">Quantity:</label>
                  <input type="text" id="quantity" name="quantity" onChange={productTypeData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" onChange={productTypeData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="type">Type:</label>
                  <select name="productTypeId" onChange={productTypeData} type="text">
                      <option key="1" defaultValue="Choose an option" hidden>Choose an option</option>
                      {dataType.map((productType, index) => (
                        <option key={index} value={productType.id}>{productType.type}</option>
                      ))}
                  </select>
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
                  <label htmlFor="quantity">Quantity:</label>
                  <input type="text" id="quantity" name="quantity" value={productInfoSelected.quantity} onChange={inputProductData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="price">Price:</label>
                  <input type="text" id="price" name="price" value={productInfoSelected.price} onChange={inputProductData} />
                </div>
                <div className="modalItem">
                  <label htmlFor="type">Type:</label>
                  <select name="productTypeId" onChange={inputProductData} type="text">
                      <option key="1" defaultValue={productInfoSelected.id} hidden>{productInfoSelected.type}</option>
                      {dataType.map((productType, index) => (
                        <option key={index} value={productType.id}>{productType.type}</option>
                      ))}
                  </select>
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

export default Products;


