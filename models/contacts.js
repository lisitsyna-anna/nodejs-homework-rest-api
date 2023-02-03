const fs = require('fs').promises;
const uniqid = require('uniqid');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const findedIndex = contacts.findIndex(contact => contact.id === contactId);
  if (findedIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(findedIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    id: uniqid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findedIndex = contacts.findIndex(contact => contact.id === contactId);
  if (findedIndex === -1) {
    return null;
  }
  contacts[findedIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[findedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
