//alert("fjdj");


// Section class
class Section {
  
  static NAME = 0;
  static NOTE = 1;

  static isName(index) {
    return index === Section.NAME;
  }

  constructor(index) {
    this.index = index;
    this.label = (Section.isName(index) ? "Name" : "Note");
    this.ability = (Section.isName(index) ? !nameInput.disabled : !noteInput.disabled);
    this.elements = {
      div: (Section.isName(index) ? nameDiv : noteDiv),
      input: (Section.isName(index) ? nameInput : noteInput),
      button: (Section.isName(index) ? nameButton : noteButton)
    };
  }

  get(element) {
    return this.elements[element];
  }

  isName() {
    return this.index === Section.NAME;
  }

  isNote() {
    return this.index === Section.NOTE;
  }

  setAbility(toDisabled) {
    this.ability = !toDisabled;
    this.get("input").disabled = toDisabled;
    if (toDisabled) {
      if (this.isNote()) {
        this.get("input").value = "";
        this.get("button").disabled = true;
      } else {
        this.get("button").innerHTML = "Log-Out";
        this.get("button").style.backgroundColor = "red";
        this.get("button").style.color = "black";
      }
    } else {
      this.get("input").value = "";
      if (this.isName()) {
        this.get("button").innerHTML = "Log-In";
        this.get("button").style.backgroundColor = "green";
        this.get("button").style.color = "white";
      } else {
        this.get("button").disabled = false;
      }
    }
  }

  getValue() {
    return this.get("input").value;
  }

  checkValue() {
    return this.get("input").value !== "";
  }

}



// Details Div
var details = document.getElementById("details");

// Output Div
var output = document.getElementById("output");

// Messages Div
var messagesDiv = document.getElementById("messages_div");

// Name Div
var nameDiv = document.getElementById("name_div");

// Note Div
var noteDiv = document.getElementById("note_div");

// Hey Server Button
var heyServerButton = document.getElementById("hey_server_button");

// Contact Input
var contactInput = document.getElementById("contact_input");

// Contact Button
var contactButton = document.getElementById("contact_button");

// Name Input
var nameInput = document.getElementById("name_input");

// Name Button
var nameButton = document.getElementById("name_button");

// Note Input
var noteInput = document.getElementById("note_input");

// Note Button
var noteButton = document.getElementById("note_button");

// Name Section Object
var nameSect = new Section(Section.NAME);

// Note Section Object
var noteSect = new Section(Section.NOTE);

// Cookies Manager Object
var cManager = new CookiesManager();



// Shake Element Function (Animation)
function shakeElement(element) {
  if (element) {
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
      if (element) {
        element.classList.remove('shake');
      }
    }, {
      once: true
    });
  }
}

// Build Note Element Function
function buildNoteElement(value, name) {
  var newNote = document.createElement("p");
  newNote.innerHTML = "<span><strong>" + name + "</strong></span>: " + value;
  return newNote;
}

// Get Note Element Function
function getNoteElement() {
  return buildNoteElement(
    noteSect.getValue(),
    nameSect.getValue(),
  );
}

// Sign In/Out Function
function sign(
  toSignIn) {
  if (toSignIn) {
    if (nameSect.checkValue()) {
      nameSect.setAbility(true);
      noteSect.setAbility(false);
      cManager.login(nameSect.getValue());
      return true;
    } else {
      console.error("Name is empty");
      shakeElement(nameSect.get("input"));
      return false;
    }
  } else {
    nameSect.setAbility(false);
    noteSect.setAbility(true);
    cManager.logout();
    return true;
  }
}

// Add Note Function
function addNote() {
  if (noteSect.checkValue()) {
    var newNote = getNoteElement();
    output.appendChild(newNote);
    noteDiv.scrollTop = noteDiv.scrollHeight;
    cManager.addNote(noteSect.getValue());
    return true;
  }
  console.error("Note is empty");
  shakeElement(noteSect.get("input"));
  return false;
}

// Add Message Function
function addMessage(message) {
  messagesDiv.innerHTML += "<p>" + message + "</p>";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendContactMessage(message) {
  console.log(JSON.stringify(contactInput))
  var contact = contactInput.value;
  console.log("Contact: " + contact);
  if (contact !== "") {
    $.ajax({
      type: "POST",
      url: "https://ilaychecks.online/Apps/app5/server.php",
      data: {
        action: "contact",
        message: contact
      },
      success: function(data) {
        console.log(data);
        var message = data.message;
        addMessage(message);
        //contact.value = "";
      },
    });
  } else {
    console.error("Contact is empty");
    shakeElement(contactInput);
  }
}

// Load User Function
function loadUser() {
  if (cManager.isSignedIn()) {
    nameSect.get("input").value = cManager.getUsername();
    nameSect.get("button").click();
    if (!cManager.isNotesEmpty()) {
      for (n of cManager.getNotes()) {
        var e = buildNoteElement(n, cManager.getUsername());
        output.appendChild(e);
      }
    }
    return true;
  }
  return false;
}



// On Name Button Click Function
function nameHandler() {
  sign(nameSect.ability);
}

// On Note Button Click Function
function noteHandler() {
  addNote();
  noteSect.get("input").value = "";
}

// On Hey Server Button Click Function
async function heyServerHandler() {
  var response = await fetch("https://ilaychecks.online/Apps/app5/server.php?action=hey");
  var data = await response.json();
  var message = data.message;
  addMessage(message);
  //var message = "Hey Server!";
  //messagesDiv.innerHTML += "<p>" + message + "</p>";
  //messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function contactHandler() {
  contactInput.value = "Hello, World!";
  alert("Contact: " + contactInput.value);
  sendContactMessage();
}

async function enterHandler() {
  var response = await fetch("https://ilaychecks.online/Apps/app5/server.php?action=enter");
  var data = await response.json();
  var message = data.message;
  addMessage(message);
}



// Check Function
function check() {
  details.innerHTML += "isSignedIn: " + cManager.isSignedIn() + "<br>";
  details.innerHTML += "username: " + cManager.getUsername() + "<br>";
  details.innerHTML += "isNotesEmpty: " + cManager.isNotesEmpty() + "<br>";
  details.innerHTML += "notes.isset(): " + cManager.notes.isset() + "<br>";
  details.innerHTML += "notes: " + cManager.getNotes() + "<br>";
  details.innerHTML += "cookie: " + document.cookie + "<br>";
  details.innerHTML += "<br> <strong>" + "- - - - - - - - - - - - - - - - - - - - - - - -" + "</strong> <br>";
}



// Load User
