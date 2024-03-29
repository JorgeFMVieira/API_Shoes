import { iProductsList } from '../../../interfaces/Products/iProductsList';
import { IProductsEdit } from '../../../interfaces/Products/IProductsEdit';
import { iProductTypeList } from '../../../interfaces/Products/iProductTypeList';
import { ProductService } from '../../../services';
import React, { useState, useEffect } from 'react';
import './Table.css';
import Create from '../Create/Create';
import Delete from '../Delete/Delete';
import Edit from '../Edit/Edit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useAuth } from '../../../Context/AuthContext';
import { AuthService } from '../../../services/AuthService';


function Table({ errorHandler }: any) {

  const [data, setData] = useState<iProductsList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [showInputName, setShowInputName] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [showSearchType, setShowInputType] = useState(false);

  const [dataType, setDataType] = useState<iProductTypeList[]>([]);

  const service = new ProductService();

  const thead = [
    {
      name: "Name"
    },
    {
      name: "Description"
    },
    {
      name: "Type"
    },
    {
      name: "Quantity"
    },
    {
      name: "Price"
    }
  ];

  const [inputValue, setInputValue] = useState(currentPage);

  const handleChange = (e: string) => {

    const inputValue = parseInt(e);

    if (e === "") {
      return;
    }

    if (isNaN(inputValue)) {
      toast.error("The page has to be a number!");
      return;
    }

    if (inputValue > totalPages) {
      toast.error("You exceeded the number of pages!");
      return;
    }

    if (inputValue < 1) {
      toast.error("The miniumum number of pages is 1!");
      return;
    }

    setInputValue(inputValue);
    setCurrentPage(inputValue);
  };

  const changeOptionSearch = async (searchOption: string) => {
    if (searchOption === "name") {
      setShowInputName(true);
      setShowSearchInput(false);
      setShowInputType(false);
      return;
    }

    if (searchOption === "all") {
      setShowSearchInput(true);
      setShowInputName(false);
      setShowInputType(false);
      return;
    }

    if (searchOption === "type") {
      setShowSearchInput(false);
      setShowInputName(false);
      setShowInputType(true);
      return;
    }
  }


  function CheckPages(): JSX.Element {
    if (currentPage <= 1 && currentPage + 1 > totalPages) {
      return <div className="btn-Page">
        <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage - 1))} disabled>Previous</button>
        <input type="text" className='currentPageInput' defaultValue={currentPage} onChange={(e) => handleChange(e.target.value)} />
        <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))} disabled>Next</button>
      </div>;
    }


    if (currentPage + 1 > totalPages) {
      return <div className="btn-Page">
        <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage - 1))}>Previous</button>
        <input type="text" className='currentPageInput' defaultValue={currentPage} onChange={(e) => handleChange(e.target.value)} />
        <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))} disabled>Next</button>
      </div>;
    }

    if (currentPage <= 1) {
      return <div className="btn-Page">
        <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage - 1))} disabled>Previous</button>
        <input type="text" className='currentPageInput' defaultValue={currentPage} onChange={(e) => handleChange(e.target.value)} />
        <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))}>Next</button>
      </div>;
    }

    if (currentPage) {
      return <div className="btn-Page">
        <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage - 1))}>Previous</button>
        <input type="text" className='currentPageInput' defaultValue={currentPage} onChange={(e) => handleChange(e.target.value)} />
        <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))}>Next</button>
      </div>;
    }

    return <div>
      <p>Erro</p>
    </div>;
  }

  const searchTableConverthTable = async (e: string) => {
    if (e.includes(',')) {
      const replaced = e.replace(',', '.');
      setSearch(replaced);
    } else {
      setSearch(e);
    }
  }

  const changeEntriesPerTable = async (e: string) => {
    const entries = parseInt(e);
    setEntries(entries);
    setCurrentPage(1);
    setInputValue(1);
  }

  const handlerError = (errorMsg: string) => {
    toast.error(errorMsg);
  }

  const handlerSuccess = (successMsg: string) => {
    toast.success(successMsg);
    setCurrentPage(1);
  }

  const [show, setShow] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState(0);

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const onClickSort = async (e: string) => {
    if (order === "") {
      return setOrder(e);
    }
    if (order === e) {
      return setOrder(e + "_desc");
    }

    if (order === e.concat("_desc")) {
      return setOrder("");
    }
    setOrder(e);
  }

  const [hideClient, setHideClient] = useState(true);

  const serviceAuth = new AuthService();
  const { isUserLoggedIn, currentUser, isAdmin } = useAuth();

  console.log(isAdmin());

  useEffect(() => {
    service.getAll(currentPage, entries, searchBy, search, order).then(result => {
      setTotalPages(result.pages);
      setCurrentPage(result.currentPage);
      setEntries(result.entries);
      setSearchBy(result.searchBy);
      setOrder(result.order);
      setData(result.products);
      if (result.search === null) {
        setSearch("");
      }

      if (isAdmin() === false) {
        setHideClient(false);
      }
    });
  }, [currentPage, totalPages, searchBy, search, entries, order, show, showDelete, showEdit]);

  return (
    <div className="tableContainer">
      <ToastContainer />
      {hideClient ?
        <button className="btn createNew" onClick={() => (setShow(true))}>Create New Product</button>
        : null}
      <Create show={show} onCancel={() => setShow(false)} handlerError={handlerError} handlerSuccess={handlerSuccess} />
      <div className="searchItems">
        <div className="searchItems-Inputs">
          {
            showSearchInput ?
              <input className="search todo" type="search" placeholder="Search..." name="search" autoComplete="off" onChange={(e) => (setSearchBy("all"), searchTableConverthTable(e.target.value), setCurrentPage(1))} />
              : null
          }

          {
            showInputName ?
              <input className="search soNome" type="search" placeholder="Search Name..." name="searchName" autoComplete="off" onChange={(e) => (setSearchBy("name"), searchTableConverthTable(e.target.value), setCurrentPage(1))} />
              : null
          }

          {
            showSearchType ?
              <input className="search soNome" type="search" placeholder="Search Name..." name="searchType" autoComplete="off" onChange={(e) => (setSearchBy("type"), searchTableConverthTable(e.target.value), setCurrentPage(1))} />
              : null
          }
          <select name="optionSearch" defaultValue={'all'} className="search search-options" onChange={(e) => changeOptionSearch(e.target.value)}>
            <option value="all">All</option>
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </div>
        <select className="search todo" onChange={(e) => changeEntriesPerTable(e.target.value)} >
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
        {data.length === 0 ?
          <div className="error">
            <p>We weren´t able to find any products.</p>
          </div>
          :
          <div>
            <table>
              <thead>
                <tr>
                  {thead.map((item, index) => {
                    return <th key={index} aria-label={item.name} onClick={(e) => onClickSort(e.currentTarget.ariaLabel!.valueOf())} >
                      {item.name}
                      {order === item.name ? <AiOutlineArrowDown /> : null}
                      {order === (item.name + "_desc") ? <AiOutlineArrowUp /> : null}
                    </th>
                  })}
                  {hideClient ?
                    <th>Options</th>
                    : null}
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    {hideClient ?
                      <td>
                        <button className="btn edit-btn" onClick={() => (setShowEdit(true), setCurrentProduct(item.id))}>Edit</button>
                        <button className="btn delete-btn" onClick={() => (setShowDelete(true), setCurrentProduct(item.id))}>Delete</button>
                      </td>
                      : null}
                  </tr>
                ))}
              </tbody>
            </table>
            <CheckPages />
          </div>
        }
      </div>
      <Edit dataType={dataType} showEdit={showEdit} onCancel={() => setShowEdit(false)} currentProduct={currentProduct} handlerError={handlerError} handlerSuccess={handlerSuccess} />
      <Delete showDelete={showDelete} onCancel={() => setShowDelete(false)} currentProduct={currentProduct} handlerError={handlerError} handlerSuccess={handlerSuccess} />
    </div>
  )
}

export default Table