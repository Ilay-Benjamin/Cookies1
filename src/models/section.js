
// Section class
 export class Section {
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
      this.elements = elements
      if (index == Section.ERROR) {
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
      console.log("< " + this.label + " - setAbility() > toDisabled: " + toDisabled);
      this.ability = !toDisabled;
      console.log("< " + this.label + " - setAbility() > this.ability: " + this.ability);
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
      console.log("< " + this.label + " - setAbility() > input.disabled: " + this.get("input").disabled);
      console.log("< " + this.label + " - setAbility() > button.disabled: " + this.get("button").disabled);
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
  
  
  