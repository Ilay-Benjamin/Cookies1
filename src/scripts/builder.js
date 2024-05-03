
// Shake Element Function
export function shakeElement(element) {
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
export function buildNoteElement(value, name) {
  var newNote = document.createElement("p");
  newNote.innerHTML = "<span><strong>" + name + "</strong></span>: " + value;
  return newNote;
}

