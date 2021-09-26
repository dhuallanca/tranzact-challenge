using System.ComponentModel.DataAnnotations;

namespace AddressBook.Domain
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [EmailAddress(ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
