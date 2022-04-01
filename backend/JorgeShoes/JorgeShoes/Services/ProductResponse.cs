using JorgeShoes.DTO;
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
            Products = new List<ListProductType>();
        }

        public List<ListProductType> Products { get; set; } = new List<ListProductType>();

        public string SearchBy { get; set; }
        public string Search { get; set; }
        public string Option { get; set; }
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public float Entries { get; set; }
        public bool Success { get; set; }
        public string Erro { get; set; }
    }
}
