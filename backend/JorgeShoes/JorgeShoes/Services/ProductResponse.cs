using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes
{
    public class ProductResponse
    {
        public ProductResponse(bool success, string erro)
        {
            Success = success;
            Erro = erro;
        }

        public ProductResponse()
        {
            Products = new List<Product>();
        }

        public List<Product> Products { get; set; } = new List<Product>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public float Entries { get; set; }
        public bool Success { get; set; }
        public string Erro { get; set; }
    }
}
