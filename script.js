
// Section class
class Section {
  static ERROR = -1;
  static NAME = 0;
  static NOTE = 1;

  static ERROR_SECTION() {
    return new Section(Section.ERROR, "Error", null, null);
  }

  static NAME_SECTION() {
    var index = Section.NAME;
    var label = "Name";
    var elements = {
      div: nameDiv,
      input: nameInput,
      button: nameButton
    };
    var ability = cManager.isSignedIn();
    return new Section(index, label, elements, ability);
  }

  static NOTE_SECTION() {
    var index = Section.NOTE;
    var label = "Note";
    var elements = {
      div: noteDiv,
      input: noteInput,
      button: noteButton
    };
    var ability = !cManager.isSignedIn();
    return new Section(index, label, elements, ability);
  }

  static isName(index) {
    return index === Section.NAME;
  }
  
  constructor(index, label, elements, ability) {
    this.index = index;
    this.label = label;
    this.elements elements
    if (ability === null) {
      this.ability = false;
    } else {
      this.setAbility(this.ability);
    }
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



// Section Factory Class
class SectionFactory {
  static ERROR_SECTION() {
    return new Section(Section.ERROR, "Error", {
      div: null,
      input: null,
      button: null
    }, null);
  }

  static NAME_SECTION() {
    var index = Section.NAME;
    var label = "Name";
    var elements = {
      div: nameDiv,
      input: nameInput,
      button: nameButton
    };
    var ability = cManager.isSignedIn();
    return new Section(index, label, elements, ability);
  }

  static NOTE_SECTION() {
    var index = Section.NOTE;
    var label = "Note";
    var elements = {
      div: noteDiv,
      input: noteInput,
      button: noteButton
    };
    var ability = !cManager.isSignedIn();
    return new Section(index, label, elements, ability);
  }

  static getSection(index) {
    if (Section.isName(index)) {
      return Section.NAME_SECTION();
    }
    if (Section.isNote(index)) {
      return Section.NOTE_SECTION();
    }
    return Section.ERROR_SECTION();
  }
}



// Cookies Manager Object
var cManager = new CookiesManager();

// Name Section Object
var nameSect = SectionFactory.ERROR_SECTION();

// Note Section Object
var noteSect = SectionFactory.ERROR_SECTION();



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
function sign(toSignIn) {
  console.log("toSignIn: " + toSignIn);
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
  var paragraph = document.createElement("p");
  paragraph.innerHTML = message;
  messagesDiv.appendChild(paragraph);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendContactMessage(message) {
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
      success: function(output) {
        console.log(output);
        var data = JSON.parse(output);
        var message = data.message + "\n" + " (Msg: " + contact + ") ";
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
    console.log("User is signed in");
    nameSect.get("input").value = cManager.getUsername();
    nameSect.get("button").click();
    if (!cManager.isNotesEmpty()) {
      for (var n of cManager.getNotes()) {
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
  sign(!nameSect.ability);
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
  console.log("Contact: " + contactInput.value);
  sendContactMessage();
}

async function enterHandler() {
  var response = await fetch("https://ilaychecks.online/Apps/app5/server.php?action=enter");
  var data = await response.json();
  var message = data.message;
  addMessage(message);
}

function loadHandlers() {
  $('#check_btn').on('click', () => {
    console.log('check_btn clicked');
    check();
  });
  $('#hey_server_button').on('click', () => {
      console.log('hey_server_button clicked');
      heyServerHandler();
  });
  $('#c_button').on('click', () => {
      console.log('c_button clicked');
      contactHandler();
  });
  $('#name_button').on('click', () => {
      console.log('name_button clicked');
      nameHandler();
  });
  $('#note_button').on('click', () => {
      console.log('note_button clicked');
      noteHandler();
  });
} 


// Check2 Function
function check2() {
  contactInput.value = "Ilayyyyyyy";
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



export function init() {
  loadHTMLElements();
  loadHandlers();
  console.log("DOM fully loaded and parsed");
  //cManager = new CookiesManager();
  nameSect = SectionFactory.NAME_SECTION();
  noteSect = SectionFactory.NOTE_SECTION();
  enterHandler();
  loadUser();
}

