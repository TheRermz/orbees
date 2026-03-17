using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class User
    {
        public required string Id { get; set; } // UUID
        public required string Email { get; set; }
        public required string Fullname { get; set; }
        public required string Username { get; set; }
        public required bool IsActive { get; set; } = true;
    }
}
