using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.Domain.Interfaces
{
    public interface IContactRepository
    {
        Task<Contact> GetById(int contactId);
        Task<IEnumerable<Contact>> GetAll();
        Task Insert(Contact contact);
        Task Update(Contact contact);
        Task Delete(Contact contact);
    }
}
