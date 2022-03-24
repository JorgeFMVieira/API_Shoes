import './Products.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';

function ProductsType() {
  const [page, setPage] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);
  const [entriesPerTable, setEntriesPerTable] = useState(5);
  const [searchTable, setSearchTable] = useState("");
  const urlAPI = "https://localhost:44384/api/ProductType?page=" + page + "&entries=" + entriesPerTable + "&search=" + searchTable;

  const [data, setData] = useState([]);


  const [productDB, setProductDB] = useState([]);

  // Window Create
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [noProducts, setNoProducts] = useState(true);

  const [showErroNoID, setShowErroNoId] = useState(false);

  const [showNoProducts, setShowNoProducts] = useState(false);

  // Create the state of productInfoSelected
  const [productInfoSelected, setProductInfoSelected] = useState({
    productTypeId: '',
    type: ''
  });

  // Save the productDB that the user will insert into the form
  // Uses setProductInfoSelected to update the state
  const inputProductData = e => {
    const { name, value } = e.target;
    setProductInfoSelected({
      ...productInfoSelected, [name]: value
    });
  }

  const [totalpages, setTotalPages] = useState(0);
  const [totalpagesFilter, setTotalPagesFilter] = useState(0);

  const requestGet = async () => {
    await axios.get(urlAPI)
      .then(response => {
        setData(response.data.productType);
        setTotalPages(response.data.pages);
        setShowNoProducts(false);
        if(response.data.productType.length == 0){
          setShowNoProducts(true);
          setNoProducts(false);
        }else{
          setShowErroNoId(false);
          setNoProducts(true);
        }
        if(response.data.erro == "SearchError"){
          setShowNoProducts(true);
        }
      }).catch(() => {
        toast.error('Please contact an administrator!');
      });
  }

  const requestPost = async () => {
    delete productInfoSelected.productTypeId;
    if (productInfoSelected.type == "") {
      toast.error('Please, fill  all fields!');
      return;
    }
    await axios.post(urlAPI, productInfoSelected)
      .then(response => {
        if(response.data.productTypeId != 0){
          setShowCreate(false);
          toast.success('A new product type: ' + response.data.type + ' has been created!');
        }else{
          toast.error('A product type with the type of ' + response.data.type + ' already exists.');
        }
        requestGet();
      }).catch(() => {
        toast.error('We weren´t able to create the product type');
      });
  }

  const requestDelete = async (id) => {
    const urlWithId = ("https://localhost:44384/api/ProductType/" + id);
    await axios.delete(urlWithId)
      .then(response => {
        setShowDelete(false);
        toast.success('The product type: ' + response.data.type + ' was deleted');
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
    if (productInfoSelected.type == "") {
        toast.error('Please, fill  all fields!');
        return;
      }
    const urlEdit = ("https://localhost:44384/api/ProductType/" + productInfoSelected.productTypeId);
    await axios.put(urlEdit, productInfoSelected)
      .then(response => {
        if(response.data.error == true){
          toast.error('The product: ' + productInfoSelected.type + ' already exists');
        }else{
          setShowEdit(false);
          toast.success('The product: ' + productInfoSelected.type + ' was edited');
        }
        requestGet();
      }).catch(error => {
        console.log(error);
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
  }, [entriesPerTable, page, inputValue, searchTable]);

  return (
    <div className="Products">
      <Nav />
      <ToastContainer />

      <div className="tableContainer">
        <div className="tableHeader">
          <h1>Products Type</h1>
        </div>
        <button className="btn createNew" onClick={() => setShowCreate(true)}>Create New Product Type</button>

          
            <div className="searchItems">
            <div className="searchItems-Inputs">


                <input className="search todo" type="search" placeholder="Search..." name="search" autoComplete="off" onChange={(e) => setSearchTable(e.target.value)} />
              
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

          {
          noProducts ?
          <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map(product => (
                <tr key={product.productTypeId}>
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
                  <label htmlFor="name">Type:</label>
                  <input type="text" id="type" name="type" onChange={inputProductData} />
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
                  <span>Are you sure you want to delete the product: {productInfoSelected.type}</span>
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn cancelBtn" onClick={() => requestDelete(parseInt(productInfoSelected.productTypeId))}>Delete</button>
                <button className="btn createNew" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }

      {
        showEdit ?
          <div className="modalWindow">
            <div className="containerModal">
              <div className="modalTitle"><h3>Edit Product</h3></div>
              <div className="modalBody">
                <div className="modalItem">
                  <label htmlFor="type">Type:</label>
                  <input type="text" id="type" name="type" value={productInfoSelected.type} onChange={inputProductData} />
                </div>
              </div>
              <div className="modalBtns">
                <button className="btn createNew" onClick={() => requestPut(parseInt(productInfoSelected.productTypeId))}>Save</button>
                <button className="btn cancelBtn" onClick={() => setShowEdit(false)}>Cancel</button>
              </div>
            </div>
          </div> : null
      }
    </div>
  );
}

export default ProductsType;
