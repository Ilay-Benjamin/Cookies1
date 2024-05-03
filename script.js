
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
  console.log("< nameHandler > nameSect.ability: " + nameSect.ability);
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
  cManager = new CookiesManager();
  loadHTMLElements();
  loadHandlers();
  console.log("DOM fully loaded and parsed");
  //cManager = new CookiesManager();
  nameSect = SectionFactory.NAME_SECTION();
  noteSect = SectionFactory.NOTE_SECTION();
  enterHandler();
  loadUser();
}

