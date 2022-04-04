import { IProductsTypeEdit } from '../../../interfaces/ProductsType/IProductsTypeEdit';
import { iProductsTypeList } from '../../../interfaces/ProductsType/iProductsTypeList';
import { ProductTypeService } from '../../../services/ProductTypeService';
import React, { useState, useEffect } from 'react';
import './Table.css';
import Create from '../Create/Create';
import Delete from '../Delete/Delete';
import Edit from '../Edit/Edit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Table() {

  const [data, setData] = useState<iProductsTypeList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");

  const service = new ProductTypeService();

  const thead = [
    {
      name: "Type"
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

  const [order, setOrder] = useState("");

  const onClickSort = async (e: string) => {
    if(order === "") {
      return setOrder(e);
    }
    if(order === e) {
      return setOrder(e + "_desc");
    }

    if(order === e.concat("_desc")){
      return setOrder("");
    }
    setOrder(e);
  }


  useEffect(() => {
    service.getAll(currentPage, entries, search, order).then(result => {
      setTotalPages(result.pages);
      setCurrentPage(result.currentPage);
      setEntries(result.entries);
      setData(result.productType);
      if (result.search === null) {
        setSearch("");
      }
    });
  }, [currentPage, totalPages, search, order, entries, show, showDelete, showEdit]);




  return (
    <div className="tableContainer">
      <ToastContainer />
      <button className="btn createNew" onClick={() => (setShow(true))}>Create New Type</button>
      <Create show={show} onCancel={() => setShow(false)} handlerError={handlerError} handlerSuccess={handlerSuccess} />
      <div className="searchItems">
        <div className="searchItems-Inputs">
            <input className="search todo" type="search" placeholder="Search..." name="search" autoComplete="off" onChange={(e) => (setSearch(e.target.value), setCurrentPage(1))} />
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
            <p>We weren´t able to find any types.</p>
          </div>
          :
          <div>
            <table>
              <thead>
                <tr>
                  {thead.map((item, index) => {
                    return <th key={index} aria-label={item.name} onClick={(e) => onClickSort(e.currentTarget.ariaLabel!.valueOf())} >
                    {item.name}
                    { order === item.name ? <AiOutlineArrowDown /> : null}
                    { order === (item.name + "_desc") ? <AiOutlineArrowUp /> : null}
                  </th>
                  })}
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.productTypeId}>
                    <td>{item.type}</td>
                    <td>
                      <button className="btn edit-btn" onClick={() => (setShowEdit(true), setCurrentProduct(item.productTypeId))}>Edit</button>
                      <button className="btn delete-btn" onClick={() => (setShowDelete(true), setCurrentProduct(item.productTypeId))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CheckPages />
          </div>
        }
      </div>
      <Edit showEdit={showEdit} onCancel={() => setShowEdit(false)} currentProduct={currentProduct} handlerError={handlerError} handlerSuccess={handlerSuccess} />
      <Delete showDelete={showDelete} onCancel={() => setShowDelete(false)} currentProduct={currentProduct} handlerError={handlerError} handlerSuccess={handlerSuccess} />
    </div>
  )
}

export default Table