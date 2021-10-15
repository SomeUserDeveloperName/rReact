import { Model } from "./model.js";
import { View } from "./view.js";
class App {
  constructor(categories = []){
      this.model = new Model()
       this.view = new View() 

    this.iconMap = {"task": "fab fa-github-square"}
  }

  init = (rootEl) => {
   //if(window.rWebApp) return this.notesDomApp 
    const notesObjArr = []  
    this.rootEl = document.querySelector(rootEl);

      this.rootEl.appendChild(this.view.createTable('notes'))
     //build notes table
      //table, thead, row
     //addbutton
     this.rootEl.appendChild(this.view.createEl("button","Create note", "", [], []))
     //summary table
     this.rootEl.appendChild(this.view.createTable('summary'))
       //table, thead, row

 }
}

  if(window.rWebApp){ 
    //console.log(`aaa`, window.rWebApp)
    //return {}; //
    window.rWebApp;

  } else {
    const categories = [];
    const store = [];
    const app = new App(categories, store)
    app.init("rootApp");
    //console.log('bbb', app)
    window.rWebApp = app;
  } 
