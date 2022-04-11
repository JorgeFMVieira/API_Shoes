using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IEmailService
    {
        Task<MessagingHelper> SendEmail(string emailTo, string templateName, object obj, string subject, string emailCC = null, string emailBCC = null, List<EmailDTO> files = null);
    }
}
