import { iProductsList } from '../../interfaces/iProductsList';
import { ProductService } from '../../services';
import React, { useState, useEffect } from 'react';
import './Table.css';
import Create from '../Product/Create/Create';
import Delete from '../Product/Delete/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table({ errorHandler }: any) {

  const [data, setData] = useState<iProductsList[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [showInputName, setShowInputName] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [showSearchType, setShowInputType] = useState(false);

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
    },
    {
      name: "Options"
    }
  ];

  const [inputValue, setInputValue] = useState(currentPage);

  const handleChange = (e: string) => {

    const inputValue = parseInt(e);

    if (e === "") {
      return;
    }

    if (isNaN(inputValue)) {
      errorHandler("The page has to be a number");
      return;
    }

    if (inputValue > totalPages) {
      errorHandler("You exceded the page limit.");
      return;
    }

    if (inputValue < 1) {
      errorHandler("The page minium is 1");
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
  }

  const [show, setShow] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    service.getAll(currentPage, entries, searchBy, search).then(result => {
      setTotalPages(result.pages);
      setCurrentPage(result.currentPage);
      setEntries(result.entries);
      setSearchBy(result.searchBy);
      setData(result.products);
      if (result.search === null) {
        setSearch("");
      }
    });
  }, [currentPage, totalPages, searchBy, search, entries, show, showDelete]);




  return (
    <div className="tableContainer">
      <ToastContainer />
      <button className="btn createNew" onClick={() => (setShow(true))}>Create New Product</button>
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
                    return <th key={index}>{item.name}</th>
                  })}
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
                    <td>
                      <button className="btn edit-btn">Edit</button>
                      <button className="btn delete-btn" onClick={() => (setShowDelete(true), setCurrentProduct(item.id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CheckPages />
          </div>
        }
      </div>
      <Delete showDelete={showDelete} onCancel={() => setShowDelete(false)} currentProduct={currentProduct} handlerError={handlerError} handlerSuccess={handlerSuccess} />
    </div>
  )
}

export default Table