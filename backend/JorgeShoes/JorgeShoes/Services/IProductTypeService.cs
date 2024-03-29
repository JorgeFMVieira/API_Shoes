﻿using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IProductTypeService
    {
        Task<ProductTypeResponse> GetProductsType(int page, float entries, string search, string searchBy, string order);
        Task<List<ProductTypeDTO>> GetAllType();
        Task<ProductType> GetProductType(int id);
        Task<ProductTypeResponse> Create(ProductType productType);
        Task Update(ProductType productType);
        Task Delete(ProductType productType);
    }
}
