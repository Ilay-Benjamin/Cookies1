
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
   // this.username.set("Ron");
  }
  
  hey() {
      return "Hello, World!";
  }

  getUsername() {
    return this.username.get();
  }

  getNotes() {
    return this.notes.get();
  }

  addNote(note) {
    
    var notesList =
      (this.notes.isset() ?
       this.getNotes() : []);
    notesList.push(note);
    this.notes.set(note);
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
  
  bye() {
      return "Bye Bye (:";
  }
 
  get() {
    const name = this.name;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';'); // Split the cookie string into individual cookies
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1); // Remove any leading spaces
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length); // Return the value part of the cookie
    }
    return null; // Return null if the cookie with the specified name isn't found
  }
  
  isset() {
    const name = this.name;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return true;
        }
    }
    return false;
  }

  set(value) {
    const name = this.name;
    const daysToExpire = 7;
    let expires = "";
    if (daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  delete() {
    const name = this.name;
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
  
}
