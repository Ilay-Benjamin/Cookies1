
// Cookies Manager Class
class CookiesManager {
  
  static USERNAME = "username";
  static NOTES = "notes";

  constructor() {
    this.username = new MyCookie(
      CookiesManager.USERNAME
    );
    this.notes = new MyCookie(
      CookiesManager.NOTES
    );
  }

  getUsername() {
    return this.username.get();
  }

  getNotes() {
    return this.notes.get();
  }

  addNote(note) {
    let notesList = this.getNotes() || []; // Get existing notes or initialize to empty array
    notesList.push(note); // Add new note to the array
    this.notes.set(notesList); // Save the updated array back to the cookie
  }

  login(username) {
    this.username.set(username);
  }

  logout() {
    this.username.delete();
  }

  isSignedIn() {
    return this.username.isset();
  }

  isNotesEmpty() {
    return (
      this.getNotes() !== null &&
      this.getNotes().length === 0
    );
  }
  
}



// Cookie Class
class MyCookie {
  
  constructor(name) {
    this.name = name;
  }

  get() {
    const nameEQ = this.name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length);
        try {
          return JSON.parse(value); // Parse the JSON stored in the cookie
        } catch (e) {
          console.error("Error parsing JSON from cookie", e);
          return null;
        }
      }
    }
    return null;
  }

  isset() {
    return this.get() !== null; // Reuse the get() method to check if the cookie is set
  }

  set(value, daysToExpire = 7) {
    let expires = "";
    if (daysToExpire) {
      const date = new Date();
      date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    const valueStr = JSON.stringify(value); // Convert value to JSON string
    document.cookie = `${this.name}=${valueStr}${expires}; path=/`;
  }

  delete() {
    document.cookie = `${this.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // Use template literal for consistency
  }
  
}
