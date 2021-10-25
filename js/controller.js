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

      const popUpEvents =  [{"type": "submit", "listener": this._onSubmit}, 
                            {"type": "click",  "listener": this._onClick},
                            {"type": "change", "listener": this._onSelect}]
      const popUpSelectors = ["popupHidden"]
      const notesTableEvents = [{"type": "click", "listener": this._onClick}]
      const createNoteButtonEvents = [{"type": "click", "listener": this._onClick}]
      
      nodes.push(this.view.createNoteAddPopUp(settings.categories, popUpSelectors, popUpEvents))
      nodes.push(this.view.createTable('notes', notesRecords, notesTableEvents))
      nodes.push(this.view.createButtonCreateNote([], createNoteButtonEvents))
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
        console.log(`onclick`, ev, action)

        const notesActions = {'archiveActiveToggle': this.showActiveArchiveNotesToggle ,
                              'removeAll': this.removeAllNotes}

        const noteActions = {'remove': this.removeNote, 'onEdit': this.onEditNote, 
                             'editSave': this.editSaveNote,
                             'archive': this.archiveNoteToggle}

        const popupActions = { 
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

    _onSubmit = (ev = {}) => {
       
        const {action, event} = this._onHandler(ev)
        const submitActions = {'addNewNote': this.addNote}

        if(Object.keys(submitActions).includes(action)){

            submitActions[action](event);
        }    
    }

    _onSelect = (ev = {}) => {
        console.log(`change`, ev)
      const {action, noteId, event} = this._onHandler(ev)

      const selectActions = {'popUpChangeCategory': this.changeCategoryIconOnAdd,
                             'noteEdit': this.changeCategoryIconOnEdit}     

        if(Object.keys(selectActions).includes(action)){
          
            selectActions[action](event, noteId);
            console.log(`select action`, action, selectActions[action])
        }                             
    }

    showActiveArchiveNotesToggle = () => {

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

        const newNote = {'name': '', 'category': '', 'content': ''}//event... | name, category, content

        Array.from(event.target).forEach(e => { 
            if(e.name && Object.keys(newNote).includes(e.name)){ 
                newNote[e.name] = e.value   
            }    
        })
   
        const newNotes = this.model.add(newNote)
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

    showCreateNotePopUp = (ev = {}) => {

        this._onHandler(ev)
        const selectors = {selectorsRemove: ['popupHidden']} 
        const desc = '.noteAddPopUp'
        this.view.showNoteAddPopUp(desc, selectors)
        console.log(`open popup`, ev)
    }

    hideCreateNotePopUp = (ev = {}) => {

        this._onHandler(ev)
        const selectors = {selectorsAdd: ['popupHidden']} 
        const desc = '.noteAddPopUp'
        this.view.hideNoteAddPopUp(desc, selectors)
        console.log(`close popup`, ev)
    }

    changeCategoryIconOnEdit = (event = {}) => {

        this._onHandler(event)
        const newNote = {'category': ''}//event... | category
        const {name, value} = event.target;
        newNote[name] = value 
   
        this.view.changeCategoryIconEditNote(event, newNote.category)
        console.log(`change icon on Edit`, newNote, event)
    }

    changeCategoryIconOnAdd = (event = {}) => {

        this._onHandler(event)
        const newNote = {'category': ''}//event... | category
        const {name, value} = event.target;
        newNote[name] = value 
   
        this.view.changeCategoryIconAddPopUp(event, newNote.category)
    }
} 