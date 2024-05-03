import { shakeElement } from './builder.js';
import { sign, addNote, addMessage } from './../assets/js/script.js';

// Load Handlers Function
export function loadHandlers() {


} 



// Name Handler Function
export function nameHandler() {
    console.log("< nameHandler > nameSect.ability: " + nameSect.ability);
    sign(nameSect.ability);
}

// Note Handler Function
export function noteHandler() {
    addNote();
    noteSect.get("input").value = "";
}

// Hey Server Handler Function
export async function heyServerHandler() {
    var response = await fetch("https://ilaychecks.online/Apps/app5/server/app/server.php?action=hey");
    var data = await response.json();
    var message = data.message;
    addMessage(message);
    //var message = "Hey Server!";
    //messagesDiv.innerHTML += "<p>" + message + "</p>";
    //messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Contact Handler Function
export async function contactHandler() {
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

// Check2 Function
export function check2() {
    contactInput.value = "Ilayyyyyyy";
}

// Check Function
export function check() {
  details.innerHTML += "isSignedIn: " + cManager.isSignedIn() + "<br>";
  details.innerHTML += "username: " + cManager.getUsername() + "<br>";
  details.innerHTML += "isNotesEmpty: " + cManager.isNotesEmpty() + "<br>";
  details.innerHTML += "notes.isset(): " + cManager.notes.isset() + "<br>";
  details.innerHTML += "notes: " + cManager.getNotes() + "<br>";
  details.innerHTML += "cookie: " + document.cookie + "<br>";
  details.innerHTML += "<br> <strong>" + "- - - - - - - - - - - - - - - - - - - - - - - -" + "</strong> <br>";
}
