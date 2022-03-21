using JorgeShoes.Context;
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
        public async Task<ActionResult<IAsyncEnumerable<ProductType>>> GetProductsType(int page, float entries, string searchBy, string search)
        {
            try
            {
                var productsType = await _productTypeService.GetProductsType(page, entries, searchBy, search);
                return Ok(productsType);
            }
            catch
            {
                throw;
            }
        }
    }
}
