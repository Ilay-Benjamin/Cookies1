import { CookieManager } from "./../src/models/cookiesManager";



// Initialize Function
export function loadHTMLElements() {

    // Details Div
    details = document.getElementById("details");

    // Output Div
    output = document.getElementById("output");

    // Messages Div
    messagesDiv = document.getElementById("messages_div");

    // Name Div
    nameDiv = document.getElementById("name_div");

    // Note Div
    noteDiv = document.getElementById("note_div");

    // Hey Server Button
    heyServerButton = document.getElementById("hey_server_button");

    // Contact Input
    contactInput = document.getElementById("c_input");

    // Contact Button
    contactButton = document.getElementById("c_button");

    // Name Input
    nameInput = document.getElementById("name_input");

    // Name Button
    nameButton = document.getElementById("name_button");

    // Note Input
    noteInput = document.getElementById("note_input");

    // Note Button
    noteButton = document.getElementById("note_button");

}



// Start Cookies Manager Function 
export function startCookiesManager() {

    // Cookie Manager Object
    cManager = new CookieManager();

}



// Initialize Sections Function
export function initializeSections() {

    // Name Section
    nameSect = Section.NAME_SECTION();

    // Note Section
    noteSect = Section.NOTE_SECTION();

}