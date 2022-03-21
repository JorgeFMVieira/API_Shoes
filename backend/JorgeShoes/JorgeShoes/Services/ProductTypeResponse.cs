using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.Services
{
    public class ProductTypeResponse
    {
        public ProductTypeResponse(bool success, bool error)
        {
            Success = success;
            Error = error;
        }

        public ProductTypeResponse()
        {
            ProductType = new List<ProductType>();
        }

        public List<ProductType> ProductType { get; set; }

        public bool Success { get; set; }
        public bool Error { get; set; }
        public int Pages { get; set; }
        public float Entries { get; set; }
        public int CurrentPage { get; set; }
        public string Search { get; set; }
        public string SearchBy { get; set; }
    }
}
