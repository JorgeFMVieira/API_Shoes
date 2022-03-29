import { iProductsList } from '../../interfaces/iProductsList';
import { ProductService } from '../../services';
import React, { useState, useEffect } from 'react';
import './Table.css';
import { stringify } from 'querystring';
import { toast } from 'react-toastify';

function Table() {

    const [data, setData] = useState<iProductsList[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [entries, setEntries] = useState(5);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("all");
    const [showInputName, setShowInputName] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(true);
    const [showSearchType, setShowInputType] = useState(false);
    const [showNoProducts, setShowNoProducts] = useState(false);
    const [showSearchOption, setShowSearchOption] = useState(true);

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

    const handleChange = (e: { target: { value: React.SetStateAction<number>; }; }) => {
      setInputValue(e.target.value);
    };

  const setChoosePage = async (e: string) => {
    const pagina = parseInt(e);
    setInputValue(pagina);

    if(e == ""){
      setCurrentPage(currentPage);
      return;
    }else{
      if(isNaN(pagina)){
        setCurrentPage(currentPage);
        setInputValue(currentPage);
        toast.error("The page number must be a number.");
        return;
      }else{
        if(pagina > totalPages){
          setInputValue(currentPage);
          toast.error("The page limit is "+ totalPages + ".");
          return;
        }
  
        if(pagina < 1){
          setInputValue(1);
          toast.error("The page minium is 1.");
          return;
        }
  
        setCurrentPage(pagina);
        service.getAll(currentPage, entries, searchBy, search);
      }
    }
  }

  const changeOptionSearch = async (searchOption: string) => {
    if (searchOption == "name") {
      setShowInputName(true);
      setShowSearchInput(false);
      setShowInputType(false);
      return;
    }

    if (searchOption == "all") {
      setShowSearchInput(true);
      setShowInputName(false);
      setShowInputType(false);
      return;
    }

    if (searchOption == "type") {
      setShowSearchInput(false);
      setShowInputName(false);
      setShowInputType(true);
      return;
    }
  }


    function CheckPages(): JSX.Element {
        if (currentPage <= 1 && currentPage + 1 > totalPages) {
          return <div className="btn-Page">
            <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage -1))} disabled>Previous</button>
            <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} />
            <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))} disabled>Next</button>
          </div>;
        }
    
    
        if (currentPage + 1 > totalPages) {
          return <div className="btn-Page">
            <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage -1))}>Previous</button>
            <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} />
            <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))} disabled>Next</button>
          </div>;
        }
    
        if (currentPage <= 1) {
          return <div className="btn-Page">
            <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage -1))} disabled>Previous</button>
            <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} />
            <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))}>Next</button>
          </div>;
        }
    
        if (currentPage) {
          return <div className="btn-Page">
            <button onClick={() => (setCurrentPage(currentPage - 1), setInputValue(currentPage -1))}>Previous</button>
            <input type="text" className='currentPageInput' value={inputValue} onChange={(e) => setChoosePage(e.target.value)} />
            <button onClick={() => (setCurrentPage(currentPage + 1), setInputValue(currentPage + 1))}>Next</button>
          </div>;
        }

        return <div>
            <p>Erro</p>
        </div>;
      }

      const searchTableConverthTable = async (e: string) => {
        if(e.includes(',')){
          const replaced = e.replace(',', '.');
          setSearch(replaced);
        }else{
            setSearch(e);
        }
      }

      const changeEntriesPerTable = async (e: string) => {
          const entries = parseInt(e);
          setEntries(entries);
      }



    useEffect(() => {
        service.getAll(currentPage, entries, searchBy, search).then(result => {
            setTotalPages(result.pages);
            setCurrentPage(result.currentPage);
            setEntries(result.entries);
            setSearchBy(result.searchBy);
            setData(result.products);
            if(result.search == null){
                setSearch("");
            }

            if(data.length == 0){
                setShowNoProducts(true);
            }else{
                setShowNoProducts(false);
            }
        });
    }, [currentPage, totalPages, searchBy, search]);

    return (
        <div className="tableContainer">
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
            {
              showSearchOption ?
              <select name="optionSearch" defaultValue={'all'} className="search search-options" onChange={(e) => changeOptionSearch(e.target.value)}>
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
              </select>
              : null
            }
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
                                <td>{item.id}</td>
                                <td>{item.description}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CheckPages />
            </div>

            {
                showNoProducts ?
                    <div className="erro">Erro</div>
                : null
            }
        </div>
    )
}

export default Table