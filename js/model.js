import {default as noteSchema} from "./helpers/schemaHelper.js"
import * as dateHelper from "./helpers/dateHelper.js"
import {default as mockObj } from "./dataMock.js"
export class Model {

  constructor(storeId = "", notesCategories = []){

    this.notesCategories = notesCategories;
    this.storeId = storeId;
    this.store = JSON.parse(localStorage.getItem(this.storeId)) || mockObj;
    this.notes = this.store.notes || [];
    this.showArchivedNotes = this.store.showArchivedNotes
    this.noteSchema = noteSchema
  }

  getNote = (noteId = "") => {
     return this.notes.filter(note => note.id === noteId)[0] || {}
  }

  add = (newNote = {}) => {

    newNote.dateCreated = dateHelper.getCurrentDate()
    newNote.id = `${newNote.dateCreated}_${ new Date().getTime()}`;
    newNote.archived = false;

    if(this.noteSchema.check(newNote) === false) throw new Error("Added note doesn't valid to schema")
    console.log(`add note`)
      const newNotes = [...this.notes, newNote] 
      this._saveRecords(newNotes)

    return this.notesTable()
  }

  edit = (noteId = "", editedNote = {}) => {
    
    editedNote.dateEdited = dateHelper.getCurrentDate()

    if(this.noteSchema.check(editedNote) === false) throw new Error("Edited note doesn't valid to schema")

      const newNotes = this.notes.map(note => noteId === note.id ? ({...note, ...editedNote}) 
                                                                 : note) 
      this._saveRecords(newNotes)
      
    return this.notesTable()
  }

  remove = (noteId) => {

    const newNotes = this.notes.filter(note => noteId != note.id) 
    this._saveRecords(newNotes)

    return this.notesTable()
  }

  removeAll = () => {

    const newNotes = this.notes.filter(note => note.archived !== this.showArchivedNotes)
    this._saveRecords(newNotes)
    return this.notesTable()
  }
  
  noteToArchive = (noteId) => {

    const newNotes = this.notes.map(note => noteId === note.id ? {...note, ...{"archived": true}} : note) 
    this._saveRecords(newNotes)
    return newNotes.filter(note => note.archived === false)
  }
  
  noteUpFromArchive = (noteId) => {

     const newNotes = this.notes.map(note => noteId === note.id ? {...note, ...{"archived": false}} : note) 
     this._saveRecords(newNotes)
     return newNotes.filter(note => note.archived === true)
  }

  noteArchiveToggle = (noteId) => {
    
    return this.showArchivedNotes ? this.noteUpFromArchive(noteId)
                                  : this.noteToArchive(noteId)               
  }

  _saveRecords = (newNotes, showArchivedNotes = this.showArchivedNotes) => {

    this.showArchivedNotes = showArchivedNotes
    this.notes = newNotes
        const newStore = {...this.store, "notes": this.notes}
    localStorage.setItem(this.storeId, JSON.stringify(newStore))  
  }

  notesTable = () => {
    return this.showArchivedNotes ? this.notes.filter(note => note.archived) 
                                  : this.notes.filter(note => !note.archived)
  }

  notesChangeArchiveFlag = () => {
    this._saveRecords(this.notes, !this.showArchivedNotes)
    return this.showArchivedNotes
  }  

  summaryTable = () => {

    const usedNotesCategories = [];
    this.notes.forEach(note => usedNotesCategories.includes(note.category) ? "" 
                      : usedNotesCategories.push(note.category))

    const notesMapArray = usedNotesCategories.map(cat => ( 
        { "category": cat,
          "active": this.notes.filter(note => (note.category == cat && !note.archived)).length,
          "archived": this.notes.filter(note => (note.category == cat && note.archived)).length,
        }))
    return notesMapArray;   
  }
}