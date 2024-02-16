let name = {}


let contacts = []
loadContacts()


/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */


function addContact(event) {
  // forms 5:50
  event.preventDefault()
  let form = event.target
  
  let contact = {
    id: generateId(),
    contactName: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }
  
  contacts.push(contact)
  saveContacts()
  form.reset()
}



/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  // JSON.stringify - local storage video @ 9:30 & save load players
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if(contactsData) {
    contacts = contactsData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let template = ""
  contacts.sort((a, b) => {
    return a.contactName.toLowerCase().localeCompare(b.contactName.toLowerCase())
  })
 
  contacts.forEach(contact => {    
    template += `
    <div class="contact-card mt-2 mb-2 ${contact.emergencyContact ? 'emergency-contact' : ''}">
      <h3 class="mt-1 mb-1">${contact.contactName}</h3>
      <div class="d-flex space-between">
        <p><i class="fa fa-fw fa-phone"></i><span>${contact.phone}</span></p>
        <a style="cursor: pointer" onclick="removeContact('${contact.id}')">
          <i class="action fa fa-trash text-danger"></i>
        </a>
      </div>
    </div>
    `
  })
  contactListElement.innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)

  if (index == -1){
    throw new Error ("Invalid Contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}


/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
document.getElementById("new-contact-form").classList.toggle("hidden")
document.getElementById("btn-addNew").classList.toggle("hidden")
}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
