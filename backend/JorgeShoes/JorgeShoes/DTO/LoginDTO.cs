using FluentValidation;
using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.DTO
{
    public class LoginDTO
    {
        public string Email { get; set; }

        public string Password { get; set; }

    }

    public class LoginDTOValidator : AbstractValidator<LoginDTO>
    {
        public LoginDTOValidator()
        {
            RuleFor(x => x.Email).NotNull().WithMessage("Insira o Email")
                .NotEmpty().WithMessage("Insira o Email");

            RuleFor(x => x.Password).NotNull().WithMessage("Insira a password")
                .NotEmpty().WithMessage("Insira a password");
        }
    }
}
