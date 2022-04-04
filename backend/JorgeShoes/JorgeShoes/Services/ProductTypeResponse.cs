using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.Services
{
    public class ProductTypeResponse
    {
        public ProductTypeResponse(string errorMsg, bool error)
        {
            ErrorMsg = errorMsg;
            Error = error;
        }

        public ProductTypeResponse()
        {
            ProductType = new List<ProductTypeDTO>();
        }

        public List<ProductTypeDTO> ProductType { get; set; }

        public string ErrorMsg { get; set; }
        public bool Error { get; set; }
        public int Pages { get; set; }
        public string Order { get; set; }
        public string SearchBy { get; set; }
        public float Entries { get; set; }
        public int CurrentPage { get; set; }
        public string Search { get; set; }
    }
}
