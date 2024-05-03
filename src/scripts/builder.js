
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
export function appendNoteElement(value, name) {
  var newNote = document.createElement("p");
  newNote.innerHTML = "<span><strong>" + name + "</strong></span>: " + value;
  output.appendChild(newNote);
  noteDiv.scrollTop = noteDiv.scrollHeight;
}


// Add Message Function
export function appendMessageElement(message) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = message;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
} 

