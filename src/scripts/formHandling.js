
// Load Handlers Function
export function loadHandlers() {

    // Check Button Click Event
    $('#check_btn').on('click', () => {
      console.log('check_btn clicked');
      check();
    });

    // Hey Server Button Click Event
    $('#hey_server_button').on('click', () => {
        console.log('hey_server_button clicked');
        heyServerHandler();
    });

    // Contact Button Click Event
    $('#c_button').on('click', () => {
        console.log('c_button clicked');
        contactHandler();
    });

    // Name Button Click Event
    $('#name_button').on('click', () => {
        console.log('name_button clicked');
        nameHandler();
    });

    // Note Button Click Event
    $('#note_button').on('click', () => {
        console.log('note_button clicked');
        noteHandler();
    });

} 



// Name Handler Function
function nameHandler() {
    console.log("< nameHandler > nameSect.ability: " + nameSect.ability);
    sign(nameSect.ability);
}

// Note Handler Function
function noteHandler() {
    addNote();
    noteSect.get("input").value = "";
}

// Hey Server Handler Function
async function heyServerHandler() {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=hey");
    var data = await response.json();
    var message = data.message;
    addMessage(message);
    //var message = "Hey Server!";
    //messagesDiv.innerHTML += "<p>" + message + "</p>";
    //messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Contact Handler Function
async function contactHandler() {
    console.log("Contact: " + contactInput.value);
    var contact = contactInput.value;
    console.log("Contact: " + contact);
    if (contact !== "") {
      $.ajax({
        type: "POST",
        url: "https://ilaychecks.online/Apps/app5/server/app/server.php",
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

// Enter Handler Function
async function enterHandler() {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=enter");
    var data = await response.json();
    var message = data.message;
    addMessage(message);
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
