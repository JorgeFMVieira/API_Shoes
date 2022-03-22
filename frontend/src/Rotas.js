import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Nav';
import Products from './Products';
import ProductsType from './ProductsType';

function Rotas() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Nav />}>
                </Route>
                <Route exact path='/products' element={<Products />}>
                </Route>
                <Route exact path='/productsType' element={<ProductsType />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Rotas