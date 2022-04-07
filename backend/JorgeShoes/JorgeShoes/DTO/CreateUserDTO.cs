using JorgeShoes.Models;
using System;
using FluentValidation;

namespace JorgeShoes.DTO
{
    public class CreateUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }

    public class CreateUserValidation : AbstractValidator<CreateUserDTO>
    {
        public CreateUserValidation()
        {
            RuleFor(x => x.Email).NotNull().WithMessage("Please, put the email")
                .NotEmpty().WithMessage("Please, put the email");
            RuleFor(x => x.Username).NotNull().WithMessage("Please, put the username")
                .NotEmpty().WithMessage("Please, put the username");
            RuleFor(x => x.Password).NotNull().WithMessage("Please, put the password")
                .NotEmpty().WithMessage("Please, put the password");
        }
    }
}
