using AddressBook.Domain;
using AddressBook.Domain.Interfaces;
using AddressBookApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AddressBookApi.Tests
{
    public class ContactsControllerTest
    {
        private ContactsController _contactController;
        private readonly Mock<IContactRepository> _contactRepository;
        public ContactsControllerTest()
        {
            _contactRepository = new Mock<IContactRepository>();
        }

        [SetUp]
        public void Setup()
        {
            _contactController = new ContactsController(_contactRepository.Object);
        }

        [Test]
        public async Task GetById_ContactExists_ReturnContact()
        {
            var contact = new Contact
            {
                ContactId = 1,
                FirstName = "Dennis",
                LastName = "Huallanca",
                Address = "main avenue 135",
                Phone = "",
                Email = "test@domain.com"
            };
            const int id = 1;
            _contactRepository.Setup(contactRepository => contactRepository.GetById(It.IsAny<int>())).ReturnsAsync(contact);

            var actionResult = await _contactController.GetById(id);
            var result = actionResult.Result as OkObjectResult;
            Assert.AreEqual(contact, result.Value);
        }

        [Test]
        public async Task GetById_ContactDoesNotExists_ReturnNotFound()
        {
            Contact contact = null;
            const int id = 2;
            _contactRepository.Setup(contactRepository => contactRepository.GetById(It.IsAny<int>())).ReturnsAsync(contact);

            var actionResult = await _contactController.GetById(id);
            var result = actionResult.Result as NotFoundResult;
            Assert.IsTrue(result.StatusCode == 404);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task Get_ContactExists_ReturnContacts()
        {
            var contacts = new List<Contact> {
                new Contact {
                ContactId = 1,
                FirstName = "Dennis",
                LastName = "Huallanca",
                Address = "main avenue 135",
                Phone = "",
                Email = "test@domain.com"
                },
                new Contact {
                ContactId = 2,
                FirstName = "Dennis",
                LastName = "Huallanca",
                Address = "main avenue 135",
                Phone = "",
                Email = "test@domain.com"
                }
            };

            _contactRepository.Setup(contactRepository => contactRepository.GetAll()).ReturnsAsync(contacts);

            var actionResult = await _contactController.Get();
            var result = actionResult.Result as OkObjectResult;
            var expectedContacts = (List<Contact>) result.Value;
            CollectionAssert.AreEqual(expectedContacts, contacts);
            Assert.AreEqual(expectedContacts.Count, contacts.Count);
        }

        [Test]
        public async Task Post_ContactNull_ReturnBadRequest()
        {
            Contact contact = null;
            _contactRepository.Setup(contactRepository => contactRepository.Insert(It.IsAny<Contact>()));

            var actionResult = await _contactController.Post(contact);
            var result = actionResult as BadRequestResult;
            Assert.IsTrue(result.StatusCode == 400);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [Test]
        public async Task Post_ValidContact_ReturnSuccess()
        {
            Contact contact = new()
            { 
                FirstName = "Dennis",
                LastName = "Hualllanca",
                Address ="lima downtown"
             };
            _contactRepository.Setup(contactRepository => contactRepository.Insert(It.IsAny<Contact>()));

            var actionResult = await _contactController.Post(contact);
            
            var result = actionResult as OkResult;
            Assert.IsTrue(result.StatusCode == 200);
            Assert.IsInstanceOf<OkResult>(result);
        }

    }
}
