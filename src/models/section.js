import { cManager } from "./cookiesManager.js";
//import { nameDiv, nameInput, nameButton, noteDiv, noteInput, noteButton } from "./../inc/va";



// Section class
export class Section {

  static ERROR = -1;
  static NAME = 0;
  static NOTE = 1;

  static isName(index) {
    return index === Section.NAME;
  }

  static isNote(index) {
    return index === Section.NOTE;
  }

  reBuild(index) {
    this.index = index;
    var label = "";
    var elements = {};
    var activity = false;
    if (Section.isName(index)) {
      label = "Name";
      elements = {
        div: nameDiv,
        input: nameInput,
        button: nameButton
      };
      activity = !cManager.isSignedIn();
    } else {
      label = "Note";
      elements = {
        div: noteDiv,
        input: noteInput,
        button: noteButton
      };
      activity = cManager.isSignedIn();
    }
    this.label = label;
    this.elements = elements;
    this.setAbility(activity);
  }
  
  constructor(index, label, elements, ability) {
    this.index = index;
    this.label = label;
    this.elements = elements
    if (index == Section.ERROR) {
      this.ability = false;
    } else {
      this.setAbility(ability);
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

  disable() {
    if (this.isNote()) {
      this.get("button").disabled = true;
      this.get("input").value = "";
      this.get("input").disabled = true;  
    } else {
      this.get("button").innerHTML = "Log-Out";
      this.get("button").style.backgroundColor = "red";
      this.get("button").style.color = "black";
      this.get("input").disabled = true;
    }
    this.activity = false;
  }

  active() {
    if (this.isName()) {
      this.get("button").innerHTML = "Log-In";
      this.get("button").style.backgroundColor = "green";
      this.get("button").style.color = "white";
      this.get("input").value = "";
      this.get("input").disabled = false;
    } else {
      this.get("button").disabled = false;
      this.get("input").disabled = false;
    }
    this.activity = true;
  }

  setAbility(mode) {
    console.log("< " + this.label + " - setAbility(mode) > mode: " + mode);
    if (mode) {
      console.log("< " + this.label + " - setAbility() > active()");
      this.active();
    } else {
      console.log("< " + this.label + " - setAbility() > disable()");
      this.disable();
    }
    console.log("< " + this.label + " - setAbility() > input.disabled: " + this.get("input").disabled);
    console.log("< " + this.label + " - setAbility() > button.disabled: " + this.get("button").disabled);
    console.log("< " + this.label + " - setAbility() > cManager.isSignedIn(): " + cManager.isSignedIn());
  }

  getValue() {
    return this.get("input").value;
  }

  checkValue() {
    return this.get("input").value !== "";
  }

}



// Section Factory Class
  export class SectionFactory {

  static ERROR_SECTION() {
    return new Section(Section.ERROR, "Error", {
      div: null,
      input: null,
      button: null
    }, false);
  }

  static NAME_SECTION() {
    var index = Section.NAME;
    var label = "Name";
    var elements = {
      div: nameDiv,
      input: nameInput,
      button: nameButton
    };
    var isSignedIn = cManager.isSignedIn();
    var ability = !isSignedIn;
    console.log("< SectionFactory.NAME_SECTION() > ability-param: " + ability);
    var s = new Section(index, label, elements, ability);
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - \n");
    return s;
  }

  static NOTE_SECTION() {
    var index = Section.NOTE;
    var label = "Note";
    var elements = {
      div: noteDiv,
      input: noteInput,
      button: noteButton
    };
    var isSignedIn = cManager.isSignedIn();
    var ability = isSignedIn;
    console.log("< SectionFactory.NOTE_SECTION() > ability-param: " + ability);
    var s = new Section(index, label, elements, ability);
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - \n");
    return s;
  }

  static getSection(index) {
    if (Section.isName(index)) {
      return SectionFactory.NAME_SECTION();
    }
    if (Section.isNote(index)) {
      return SectionFactory.NOTE_SECTION();
    }
    return SectionFactory.ERROR_SECTION();
  }

}



// Name Section
export var nameSect = SectionFactory.ERROR_SECTION();

// Note Section
export var noteSect = SectionFactory.ERROR_SECTION();



// Reload Sections Function
export function reloadSections() {
  nameSect = SectionFactory.getSection(Section.NAME);
  noteSect = SectionFactory.getSection(Section.NOTE);
}