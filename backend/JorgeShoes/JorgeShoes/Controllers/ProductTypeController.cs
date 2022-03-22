﻿using JorgeShoes.Context;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private readonly IProductTypeService _productTypeService;
        private readonly AppDbContext _context;

        public ProductTypeController(IProductTypeService productTypeService, AppDbContext context)
        {
            _productTypeService = productTypeService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<ProductType>>> GetProductsType(int page, float entries, string search)
        {
            try
            {
                var productsType = await _productTypeService.GetProductsType(page, entries, search);
                return Ok(productsType);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProductType>> Create(ProductType productType)
        {
            try
            {
                await _productTypeService.Create(productType);
                return productType;
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromBody]ProductType productType)
        {
            try
            {
                if (productType.Id == id)
                {
                    await _productTypeService.Update(productType);
                    return Ok($"Product Type {productType.Type} was edited");
                }
                else
                {
                    return BadRequest($"Product not found");
                }
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var product = await _productTypeService.GetProductType(id);
                if (product == null)
                {
                    return NotFound($"We weren´t able to find the product with the id of {id}");
                }
                else
                {
                    var delete = await _productTypeService.Delete(product);
                    if (delete == true)
                    {
                        return Ok(true);
                    }
                    return Ok(false);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to edit the product");
            }
        }
    }
}
