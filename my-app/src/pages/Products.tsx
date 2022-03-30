import Table from '../components/Table/Table';
import { useState } from 'react';
import './Products.css';
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";
import ReactDOM from 'react-dom';

function Products() {

    const [erro, setErro] = useState('');


    const [style, setStyle] = useState("erroToastContainer hide");
  
    const errorHandler = (errorMsg: string) => {
        setErro(errorMsg);
        setStyle("erroToastContainer");
        setTimeout(() => {
            setStyle("erroToastContainer hide");
        }, 3500);
    }

    const clickToastContainer =  () => {
        setStyle("hide");
    }



    return (
        <div>
            <Table errorHandler={errorHandler} />
            <div className="erroToast">
                <div className={style} id='toast' onClick={() => clickToastContainer()}>
                    <div className="close"><AiOutlineClose /></div>
                    <div className="itemsError">
                        <div className="icon"><AiFillWarning /></div>
                        <div className="errorMsg">{erro}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products