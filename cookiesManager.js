
// Cookies Manager Class
class CookiesManager {
  
  static USERNAME = "username";
  static NOTES = "notes";

  constructor() {
    this.username = new MyCookie(CookiesManager.USERNAME);
    this.notes = new MyCookie(CookiesManager.NOTES);
  }

  getUsername() {
    return this.username.get();
  }

  getNotes() {
    return JSON.parse(this.notes.get());
  }

  addNote(note) {
    var notesList = (this.notes.isset() ? this.getNotes() : []);
    notesList.push(note);
    this.notes.set(JSON.stringify(notesList));
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
    return  this.getNotes() === null && this.getNotes().length === 0
  }
  
}



// Cookie Class
class MyCookie {
  
  constructor(name) {
    this.name = name;
  }

  get() {
    const nameEQ = this.name + "=";
    const ca = document.cookie.split(';'); // Split the cookie string into individual cookies
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim(); // Trim leading spaces using trim() for cleaner syntax
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length); // Return the value part of the cookie
    }
    return null; // Return null if the cookie with the specified name isn't found
  }
  
  isset() {
    return this.get() !== null; // Reuse the get() method to check if the cookie is set
  }

  set(value, daysToExpire = 7) { // Add daysToExpire as a parameter with a default value
    let expires = "";
    if (daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${this.name}=${value}${expires}; path=/`; // Use this.name for consistency
  }

  delete() {
    document.cookie = `${this.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // Use template literal for consistency
  }
  
}
