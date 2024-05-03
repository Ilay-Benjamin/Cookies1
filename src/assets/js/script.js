import { loadHandlers } from './../../scripts/formHandling.js';
import { CookiesManager } from './../../models/cookiesManager.js';
import { Section, SectionFactory } from './../../models/section.js';
import { shakeElement, buildNoteElement } from './../../scripts/builder.js';

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
    var newNote = buildNoteElement(noteSect.getValue(), nameSect.getValue());
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

function loadNotes() {
  if (!cManager.isNotesEmpty()) {
    var name = (cManager.isSignedIn()) ? cManager.getUsername() : "Guest";
    for (var n of cManager.getNotes()) {
      var e = buildNoteElement(n, name);
      output.appendChild(e);
    }
  }
}

// Load User Function
function loadUser() {
  if (cManager.isSignedIn()) {
    console.log("User is signed in");
    nameSect.get("input").value = cManager.getUsername();
    nameSect.get("button").click();
  } 
  loadNotes();
  return (cManager.isSignedIn());
}



// Initialize Function
export function init() {
  cManager = new CookiesManager();
  loadHTMLElements();
  loadHandlers();
  console.log("DOM fully loaded and parsed");
  nameSect = SectionFactory.NAME_SECTION();
  noteSect = SectionFactory.NOTE_SECTION();
  enterHandler();
  loadUser();
}

