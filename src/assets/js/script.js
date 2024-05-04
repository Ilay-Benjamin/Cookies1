import { cManager } from './../../models/cookiesManager.js';
import { nameSect, noteSect } from './../../models/section.js';
import { shakeElement, appendNoteElement, appendMessageElement } from './../../scripts/builder.js';
import { enter } from './../../services/enterService.js';
import { loginToServer } from './../../services/loginService.js';

// Sign In/Out Function
export function sign(mode) {
  var toSignIn = mode;
  if (toSignIn) {
    if (nameSect.checkValue()) {
      nameSect.setAbility(false);
      noteSect.setAbility(true);
      cManager.login(nameSect.getValue());
      return true;
    } else {
      console.error("Name is empty");
      shakeElement(nameSect.get("input"));
      return false;
    }
  } else {
    nameSect.setAbility(true);
    noteSect.setAbility(false);
    cManager.logout();
    return true;
  }
}

// Add Note Function
export function addNote() {
  if (noteSect.checkValue()) {
    appendNoteElement(noteSect.getValue(), nameSect.getValue());
    cManager.addNote(noteSect.getValue());
    return true;
  }
  console.error("Note is empty");
  shakeElement(noteSect.get("input"));
  return false;
}


// Load Notes Function
function loadNotes() {
  if (!cManager.isNotesEmpty()) {
    var name = (cManager.isSignedIn()) ? cManager.getUsername() : "Guest";
    for (var n of cManager.getNotes()) {
      appendNoteElement(n, name);
    }
  }
}

// Load User Function
function loadUser() {
  if (cManager.isSignedIn()) {
    console.log("User is signed in");
    nameSect.get("input").value = cManager.getUsername();
    nameSect.setAbility(false);
    loginToServer(cManager.getUsername());
  } 
  return (cManager.isSignedIn());
}

// Initialize Function
export function init() {
  console.log("DOM fully loaded and parsed");
  enter((data) => appendMessageElement(data.message));
  loadUser();
  loadNotes();
}

