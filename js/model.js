export class Model {

  constructor(){

    this.store = JSON.parse(localStorage.getItem('webApp')) || [];
    this.notes = this.store.notes;
  }
  init = (rootEl, store) => {
  const el = document.createElement("span") 
        el.textContent = "hello world";
       document.querySelector(rootEl).appendChild(el);
      const note = {
        noteIcon: "fab fa-github-square",
        //this.iconMap["task"],
        noteName: "abcd",
        noteCreated: "May 15, 2021",
        noteCategory: "Task",
        noteContent: "build this shit",
        noteChangedDate: "3/5/2021, 5/5/2021",
        //controlButtons
      } 
      console.log('m', view)
  }
  add = () => {

  }
  edit = (rowEl) => {
  
  }
  remove = (rowEl) => {
  
  }
  toArchive = (rowEl) => {
      rowEl.noteId
  }
  
  fromArchive = (rowEl) => {
  
  }
  summaryTable = (arr) => {
    const notesCategories  = []
    arr.forEach(note => notesCategories.includes(note.category) ? "" 
                      : notesCategories.push(note.category))

    const notesMapArray = notesCategories.map(cat => { 
      return { cat,
          "active": arr.filter(note => (note.category == cat && note.archived)),
          "archived": arr.filter(note => (note.category == cat && !note.archived)),
        }})
        
  }
}
//export { init, summaryTable };