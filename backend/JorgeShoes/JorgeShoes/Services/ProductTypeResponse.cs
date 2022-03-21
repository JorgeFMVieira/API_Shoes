using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.Services
{
    public class ProductTypeResponse
    {
        public ProductTypeResponse(bool success, string erro)
        {
            Success = success;
            Erro = erro;
        }

        public ProductTypeResponse()
        {
            ProductType = new List<ProductType>();
        }

        public List<ProductType> ProductType { get; set; } = new List<ProductType>();

        public string SearchBy { get; set; }
        public string Search { get; set; }
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public float Entries { get; set; }
        public bool Success { get; set; }
        public string Erro { get; set; }
    }
}
