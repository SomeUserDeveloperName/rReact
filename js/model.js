import * as noteSchema from "./schemaHelper.js"
import * as dateHelper from "./dateHelper.js"
export class Model {

  constructor(storeId = "", notesCategories = []){

    const mockObj = {"notes": [{ "id": 1, "name": "alala", "dateCreated": "30/02/2145", 
                                "category": "Task", "content": "some content", 
                                "dateEdited": "", "archived": false},
                                { "id": 2, "name": "gfg", "dateCreated": "11/12/2035", 
                                "category": "Task", "content": "flfklfglkbn", 
                                "dateEdited": "", "archived": false}],
                     "showArchivedNotes": false}

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
    newNote.id = `${newNote.dateCreated}_${ new Date().getTime()}`;//Math.floor(Math.random()*99+1)
    newNote.archived = false;

    if(this.noteSchema.check(newNote) === false) throw new Error("Added note doesn't valid to schema")

      const newNotes = [...this.notes, newNote] 
      this._saveRecords(newNotes)
    return newNotes
  }

  edit = (noteId = "", newNote = {}) => {
    
    newNote.editedDate = dateHelper.getCurrentDate()

    if(this.noteSchema.check(newNote) === false) throw new Error("Edited note doesn't valid to schema")

      const newNotes = this.notes.map(note => noteId === note.id, {...note, ...newNote}) 
      this._saveRecords(newNotes)
    return newNotes
  }

  remove = (noteId) => {

    const newNotes = this.notes.filter(note => noteId != note.id) 
    this._saveRecords(newNotes, )
    return newNotes
  }

  removeAll = () => {

    const newNotes = []
    const showArchivedNotes = false;
    this._saveRecords(newNotes, showArchivedNotes)
    return newNotes
  }
  
  noteToArchive = (noteId) => {

    const newNotes = this.notes.map(note => noteId === note.id, {"archived": true, ...note}) 
    this._saveRecords(newNotes)
    return newNotes
  }
  
  noteUpFromArchive = (noteId) => {

     const newNotes = this.notes.map(note => noteId === note.id, {"archived": false, ...note}) 
     this._saveRecords(newNotes)
     return newNotes
  }

  noteArchiveToogle = (noteId) => {
    
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

  notesChangeArchiveFlag = () => this._saveRecords(this.notes, !this.showArchivedNotes)

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