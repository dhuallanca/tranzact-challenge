using AddressBook.Domain;
using AddressBook.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.Repository.EF.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDBContext _context;

        public ContactRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task Delete(Contact contact)
        {
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Contact>> GetAll()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetById(int contactId)
        {
            return await _context.Contacts.FirstOrDefaultAsync(contact => contact.ContactId == contactId);
        }

        public async Task Insert(Contact contact)
        {
             _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Contact contact)
        {
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
        }
    }
}
