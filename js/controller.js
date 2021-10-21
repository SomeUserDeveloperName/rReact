import * as settings from "./settings.js"

export class Controller {
    constructor(model, view){
        this.model = model
        this.view = view
        this.root = document.querySelector(settings.rootElement);
        this.editNoteFlag = false
    }

    buildIndex = () => {
        const nodes = []
      const notesRecords = this.model.notesTable()
      const summaryRecords = this.model.summaryTable()

      const notesTableEvents = [{"type": "click", "listener": this._onClick}]
       
      nodes.push(this.view.createNoteAddPopUp())
      nodes.push(this.view.createTable('notes', notesRecords, notesTableEvents))
      nodes.push(this.view.createEl("button","Create note", "", [], []))
      nodes.push(this.view.createTable('summary', summaryRecords))
      
      this.root.append(...nodes)
    }

    _onHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if(!(typeof event === "object") || 
           !(event instanceof Event)) throw new Error (`Controller: handle not Event object`)

      const action = event.target?.attributes?.action?.nodeValue ?? ""
        //if(!action) throw new Error (`Controller: Dom Event Action is empty`)
      const noteId = event.target?.parentNode?.parentNode?.attributes?.rowid?.nodeValue ?? "" ;

      return {action, noteId, event}
    }

    _onClick = (ev) => {
        const {action, noteId, event} = this._onHandler(ev)
   
        const notesActions = {'archiveActiveToggle': this.showHideAllNotesToggle ,
                              'removeAll': this.removeAllNotes}

        const noteActions = {'remove': this.removeNote, 'onEdit': this.onEditNote, 
                             'editSave': this.editSaveNote,
                             'archive': this.archiveNoteToggle}

        const popupActions = {'addNote': this.addNote, 
                              'closePopUp': this.hideCreateNotePopUp,
                              'showPopUp': this.showCreateNotePopUp}                              

        const clickActions = {...noteActions, ...notesActions, ...popupActions}      

        if(Object.keys(clickActions).includes(action)){
          
            if(this.editNoteFlag === false || action === "editSave"){
                clickActions[action](event, noteId);
            }    
            // console.log(`click Action`, action, noteActions[action])
        }
        
        //console.log(`controller click`, ev.target.attributes.action.nodeValue, ev)
    }

    _onSelect = (ev = {}) => {
      const {action, noteId, event} = this._onHandler(ev)

      const selectActions = {'popUpChangeCategory': this.changeCategoryIconOnAdd,
                             'noteEdit': this.changeCategoryIconOnEdit}     

        if(Object.keys(selectActions).includes(action)){
          
            selectActions[action](event, noteId);
            console.log(`select action`, action, noteActions[action])
        }                             
    }

    showHideAllNotesToggle = () => {

        this.model.notesChangeArchiveFlag()
        const newNotes = this.model.notesTable()
        this.view.updateNotesTable(newNotes)                 
    }

    removeAllNotes = () => {

        const newNotes = this.model.removeAll()
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    removeNote = (_, noteId) => {

        const newNotes = this.model.remove(noteId)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    addNote = (event) => {

        const newNote = {}//event... | name, category, content
        const newNotes = this.model.addNote(newNote)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    onEditNote = (_, noteId) => {

        const note = this.model.getNote(noteId)

        if(note.id){ 
            this.view.editTableRow(node, settings.categories, note.category)
            this.editNoteFlag = true
        }               
    }

    editSaveNote = (event, noteId) => {

        const newNote = {}//event | name, category, content
        const newNotes = this.model.edit(noteId, newNote)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary) 
        //this. 
    }

    archiveNoteToggle = (_, noteId) => {

        const newNotes = this.model.noteArchiveToogle(noteId)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    showCreateNotePopUp = () => {}

    hideCreateNotePopUp = () => {}

    changeCategoryIconOnEdit = () => {}

    changeCategoryIconOnAdd = () => {}
} 