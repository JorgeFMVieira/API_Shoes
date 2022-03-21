using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JorgeShoes.Context;
using JorgeShoes.Models;
using JorgeShoes.Services;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        private IProductTypeService _productTypeService;
        private readonly AppDbContext _context;

        public ProductTypesController(IProductTypeService productTypeService, AppDbContext context)
        {
            _productTypeService = productTypeService;
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<ProductType>>> GetProductsTypes(int page, float entries, string searchBy, string search)
        {
            try
            {
                var products = await _productTypeService.GetProductTypes(page, entries, searchBy, search);
                return Ok(products);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("{id:int}", Name = "GetProductType")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            try
            {
                var product = await _productTypeService.GetProductType(id);
                if (product == null)
                {
                    return NotFound($"We weren´t able to find products with the id of {id}");
                }
                else
                {
                    return Ok(product);
                }
            }
            catch
            {
                return NotFound($"We weren´t able to find products with the id of {id}"); ;
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(ProductType product)
        {
            try
            {
                await _productTypeService.Create(product);
                return CreatedAtRoute(nameof(GetProductType), new { id = product.Id }, product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to create a product");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody] ProductType product)
        {
            try
            {
                if (product.Id == id)
                {
                    await _productTypeService.Update(product);
                    return Ok($"Product width id of {id} was updated");
                }
                else
                {
                    return BadRequest("We weren´t able to find an product");
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to edit the product");
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
