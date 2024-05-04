import { shakeElement, appendMessageElement } from './builder.js';
import { sign, addNote } from './../assets/js/script.js';
import { heyServer } from './../services/heyServerService.js';
import { getUsername } from './../services/getUsernameService.js';
import { getNotes } from './../services/getNotesService.js';
import { nameSect, noteSect } from './../models/section.js';
import { cManager } from './../models/cookiesManager.js';



// Name Handler Function
export function nameHandler() {
    sign(nameSect.ability);
}

// Note Handler Function
export function noteHandler() {
    addNote();
    noteSect.get("input").value = "";
}

// Hey Server Handler Function
export async function heyServerHandler() {
    heyServer((data) => appendMessageElement(data.message));
}

// Contact Handler Function
export async function contactHandler() {
    var contact = contactInput.value;
    if (contact !== "") {
      $.ajax({
        type: "POST",
        url: "https://ilaychecks.online/Apps/app5/server/app/server.php",
        data: {
          action: "contact",
          message: contact
        },
        success: function(output) {
          var data = JSON.parse(output);
          appendMessageElement(data.message + "\n" + " (Msg: " + contact + ") ");
          //contact.value = "";
        },
      });
    } else {
      console.error("Contact is empty");
      shakeElement(contactInput);
    }
}

// Check Function
export function check() {
    getNotes((data) => appendMessageElement(data.notes));
}

// Check2 Function
export function check2() {
    contactInput.value = "Ilayyyyyyy";
}

// Check3 Function
export function check3() {
  details.innerHTML += "isSignedIn: " + cManager.isSignedIn() + "<br>";
  details.innerHTML += "username: " + cManager.getUsername() + "<br>";
  details.innerHTML += "isNotesEmpty: " + cManager.isNotesEmpty() + "<br>";
  details.innerHTML += "notes.isset(): " + cManager.notes.isset() + "<br>";
  details.innerHTML += "notes: " + cManager.getNotes() + "<br>";
  details.innerHTML += "cookie: " + document.cookie + "<br>";
  details.innerHTML += "<br> <strong>" + "- - - - - - - - - - - - - - - - - - - - - - - -" + "</strong> <br>";
}

// Check Function
export function check4() {
  getUsername((data) => appendMessageElement(data.username));
