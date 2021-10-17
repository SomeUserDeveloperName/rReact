import * as noteSchema from "./schemaHelper.js"
import * as dateHelper from "./dateHelper.js"
export class Model {

  constructor(storeId = "", notesCategories = []){

    this.notesCategories = notesCategories;
    this.storeId = storeId;
    this.store = JSON.parse(localStorage.getItem(this.storeId)) || [];
    this.notes = this.store.notes || [];
    this.noteSchema = noteSchema
  }

  add = (newNote = {}) => {

    newNote.dateCreated = dateHelper.getCurrentDate()

    if(this.noteSchema.check(newNote) === false) throw new Error("Added note doesn't valid to schema")

      const newNotes = [...this.notes, newNote] 
      this.saveRecords(newNotes)
    return newNotes
  }

  edit = (noteId, newNote = {}) => {
    
    newNote.editedDate = dateHelper.getCurrentDate()

    if(this.noteSchema.check(newNote) === false) throw new Error("Edited note doesn't valid to schema")

      const newNotes = this.notes.map(note => noteId === note.id, {...note, ...newNote}) 
      this.saveRecords(newNotes)
    return newNotes
  }

  remove = (noteId) => {

    const newNotes = this.notes.filter(note => noteId != note.id) 
    this.saveRecords(newNotes)
    return newNotes
  }
  toArchive = (noteId) => {

    const newNotes = this.notes.map(note => noteId === note.id, {"archived": true, ...note}) 
    this.saveRecords(newNotes)
    return newNotes
  }
  
  fromArchive = (noteId) => {

     const newNotes = this.notes.map(note => noteId === note.id, {"archived": false, ...note}) 
     this.saveRecords(newNotes)
     return newNotes
  }

  saveRecords = (newNotes) => {

    this.notes = newNotes
    localStorage.setItem(storeId, JSON.stringify(this.notes))
  }

  notesTable = () => {

     return this.notes.filter(note => !note.archived)
  }

  notesArchiveTable = () => {
     return this.notes.filter(note => note.archived)
  }

  summaryTable = () => {
    const usedNotesCategories = [];
    this.notes.forEach(note => usedNotesCategories.includes(note.category) ? "" 
                      : usedNotesCategories.push(note.category))

    const notesMapArray = usedNotesCategories.map(cat => { 
      return { cat,
          "active": arr.filter(note => (note.category == cat && note.archived)),
          "archived": arr.filter(note => (note.category == cat && !note.archived)),
        }})
    return notesMapArray;   
  }
}