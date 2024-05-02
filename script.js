//alert("fjdj");


// Section class
class Section {
  static NAME = 0;
  static NOTE = 1;

  static isName(index) {
    return index === Section.NAME;
  }
  
  constructor(index) {
    this.index = 
      index;
    this.label =  
      (Section.isName(index)
      ? "Name" : "Note");
    this.ability = 
      (Section.isName(index) ? 
       !nameInput.disabled :
       !noteInput.disabled);
    this.elements = {
      div: 
        (Section.isName(index) ? 
         nameDiv : noteDiv),
      input: 
        (Section.isName(index) ? 
         nameInput : noteInput),
      button: 
        (Section.isName(index) ? 
         nameButton : noteButton)
    };
  }

  get(element) {
    return this.elements[element];
  }

  isName() {
    return this.index === 
      Section.NAME;
  }
  
  isNote() {
    return this.index === 
      Section.NOTE;   
  }

  setAbility(toDisabled) {
    this.ability = !toDisabled;
    this.get("input").disabled =
      toDisabled;
    if (toDisabled) {
      if (this.isNote()) {
        this.get("input").value = "";
        this.get("button").disabled =
          true;
      } else {
        this.get("button")
          .innerHTML = "Log-Out";
        this.get("button").style
          .backgroundColor = "red";
        this.get("button").style
          .color = "black";
      }
    } else {
      this.get("input").value = "";
      if (this.isName()) {
        this.get("button")
          .innerHTML = "Log-In";    
        this.get("button").style
          .backgroundColor = "green";
        this.get("button").style
          .color = "white";
      } else {
        this.get("button").disabled =
          false;
      }
    }
  }

  getValue() {
    return this.get("input").value;
  }

  checkValue() {
    return this.get("input")
      .value !== "";
  }
  
}



// Name Div
var nameDiv = 
  document.getElementById
  ("name_div");

// Note Div
var noteDiv = 
  document.getElementById
  ("note_div");

// Output Div
var output = 
  document.getElementById
  ("output");

// Name Input
var nameInput = 
  document.getElementById
  ("name_input");

// Note Input
var noteInput = 
  document.getElementById
  ("note_input");

// Name Buton
var nameButton = document.getElementById
  ("name_button");

// Note Button
var noteButton = 
  document.getElementById
  ("note_button");



// Name Section Object
var nameSect =   
  new Section(Section.NAME);

// Note Section Object
var noteSect =   
  new Section(Section.NOTE);



// Cookies Manager Object
var cManager =
  new CookiesManager();

//cManager.username.set(
//  "Guest");
//console.log(
//  cManager.username.get());
// Shake Element Function (Animation)
function shakeElement(element) {
  if (element) {
    element.classList.add('shake'); 
    element.addEventListener(
      'animationend', () => {
        if (element) {
          element.classList
            .remove('shake');
        }
      }, { once: true }
    );
  }
}



// Build Note Element Function
function buildNoteElement(
  value, name) {
  var newNote = 
    document.createElement("p");
  newNote.innerHTML = 
    "<span><strong>" + name + 
    "</strong></span>: " + value;
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
        cManager.login(
        nameSect.getValue());
      return true;
    } else {
      console.error("Name is empty");
      shakeElement(
        nameSect.get("input"));
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
    noteSect.get("input")
      .value = "";
  //  noteSect.get("button")
   //   .disabled = true;
    cManager.addNote(
      noteSect.getValue());
    return true;
  } 
  console.error("Note is empty");
  shakeElement(
    noteSect.get("input"));
  return false;
}

// Load User Function
function loadUser() {
  if (cManager.isSignedIn()) {
    nameSect.get("input").value = 
      cManager.getUsername();
    nameSect.get("button").click();
    if (!cManager.isNotesEmpty()) {
      for(
        n of cManager.getNotes()
      ) {
        var e = buildNoteElement (
          n, cManager.getUsername()
        );
        output.appendChild(e);
      }
    }
    return true;
  } 
  return false;
}



//
function nameHandler() {
    sign(nameSect.ability);
}

ss
function noteHandler() {
    addNote();
}

function check() {
    alert(
        cManager.isSignedIn()
    );
    output.innerHTML += 
      "isSignedIn: " + 
      cManager.isSignedIn() +
      "<br>";
    output.innerHTML += 
      "username: " +
      cManager.getUsername() + 
      "<br>";
    output.innerHTML += 
      "cookie: " + 
      document.cookie +
      "<br>";
    //loadUser();
}

//HEYYYYYYYYYYYYY



//
//loadUser();
