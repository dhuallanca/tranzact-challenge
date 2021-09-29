using AddressBook.Domain;
using AddressBook.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AddressBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactsController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        // GET: api/<ContactsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> Get()
        {
            var contacts = await _contactRepository.GetAll();
            return Ok(contacts);
        }

        // GET api/<ContactsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetById(int id)
        {
            var contact = await _contactRepository.GetById(id);
            return contact != null ? Ok(contact) : NotFound();
        }

        // POST api/<ContactsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Contact contact)
        {
            try
            {
                if (contact == null)
                {
                    return BadRequest();
                }
                await _contactRepository.Insert(contact);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Error adding data contact");
            }
        }

        // PUT api/<ContactsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Contact contact)
        {
            if (contact.ContactId != id)
            {
                return BadRequest("");
            }
            try
            {
                await _contactRepository.Update(contact);
                return Ok();

            } 
            catch
            {
                return StatusCode(500, "Error updating data contact");
            }
            
        }

        // DELETE api/<ContactsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var contact = await _contactRepository.GetById(id);
            if (contact == null)
            {
                return NotFound();
            }
            try
            {
                await _contactRepository.Delete(contact);
                return Ok();
            }
            catch 
            {
                return StatusCode(500, "Error removing data contact");
            }
        }
    }
}
