import * as settings from "./settings.js"

export class Controller {
    constructor(model, view){
        this.model = model
        this.view = view
        this.root = document.querySelector(settings.rootElement);
        this.editNoteFlag = false
        this.createNotePopUpFlag = false
    }

    buildIndex = () => {
      const nodes = []
      const notesRecords = this.model.notesTable()
      const summaryRecords = this.model.summaryTable()

      const popUpEvents =  [{"type": "submit", "listener": this._onSubmit}, 
                            {"type": "click",  "listener": this._onClick},
                            {"type": "change", "listener": this._onSelect}]
      const popUpSelectors = ["popupHidden"]
      const notesTableEvents = [{"type": "change", "listener": this._onSelect}, 
                                {"type": "click", "listener": this._onClick}]
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
      const noteId = event.target?.parentNode?.parentNode?.parentNode?.parentNode?.attributes?.rowid?.nodeValue ?? "" ;

      return {action, noteId, event}
    }

    _onClick = (ev) => {
    
        const {action, noteId, event} = this._onHandler(ev)

        const notesActions = {'archiveActiveToggle': this.showActiveArchiveNotesToggle ,
                              'removeAll': this.removeAllNotes}

        const noteActions = {'remove': this.removeNote, 
                             'onEdit': this.onEditNote, 
                             'onEditCancel': this.onEditNoteCancel,
                             'editSave': this.editSaveNote, 
                             'archive': this.archiveNoteToggle}

        const popupActions = { 
                              'closePopUp': this.hideCreateNotePopUp,
                              'showPopUp': this.showCreateNotePopUp}                              

        const clickActions = {...noteActions, ...notesActions, ...popupActions}      

        if(Object.keys(clickActions).includes(action)){
 
            if((this.createNotePopUpFlag === true && action === 'closePopUp')//block all event in popup background
               || (this.editNoteFlag === true && ['editSave','onEditCancel'].includes(action))
               || (this.editNoteFlag === false && this.createNotePopUpFlag === false)){
    
                    clickActions[action](event, noteId);
            }    
        }
    }

    _onSubmit = (ev = {}) => {
       
        const {action, event} = this._onHandler(ev)
        const submitActions = {'addNewNote': this.addNote}

        if(Object.keys(submitActions).includes(action)){

            submitActions[action](event);
        }    
    }

    _onSelect = (ev = {}) => {
 
      const {action, _, event} = this._onHandler(ev)
      const noteId = event.target?.parentNode?.parentNode?.attributes?.rowid?.nodeValue ?? "" ;
      
      const selectActions = {'popUpChangeCategory': this.changeCategoryIconOnAdd,
                             'noteEditChangeCategory': this.changeCategoryIconOnEdit}     

        if(Object.keys(selectActions).includes(action)){
          
            selectActions[action](event, noteId);
        }                             
    }

    showActiveArchiveNotesToggle = () => {

        const activeArchiveFlag = this.model.notesChangeArchiveFlag()
        const newNotes = this.model.notesTable()
        this.view.updateNotesTable(newNotes)
        this.view.activeArchiveNotesToggle(activeArchiveFlag)
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
        const formNode = event.target

        Array.from(formNode).forEach(e => { 
            if(e.name && Object.keys(newNote).includes(e.name)){ 
                newNote[e.name] = e.value   
            }    
        })

        const newNotes = this.model.add(newNote)
        const newSummary = this.model.summaryTable()

        formNode.reset()
        this.hideCreateNotePopUp(event)
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    onEditNote = (ev = {}, noteId) => {

        const note = this.model.getNote(noteId)
      
        if(note.id){ 
          this.editNoteFlag = true
          this.view.editTableRow(note, settings.categories)
        }     
    }

    onEditNoteCancel = (ev = {}, noteId) => {

          this.editNoteFlag = false
          const notes = this.model.notesTable()
          this.view.updateNotesTable(notes)       
    }
    
    findNode = (ev = {}, match = [], maxDepth = 5) => {
        let res = {}
        let leave = ev.target
        let i = 0
        while(i < maxDepth){
            console.log(`findNode`, i, leave, res)
            if(i != 0) leave = leave['parentNode']

            const vals = match.map(key => leave.attributes[key])
            console.log(`findNode vals`, vals)
            if(vals.filter(val => val !== 'undefined').length === match.length){
               match.forEach((key, idx) => (res[key] = vals[idx]))
               return res;
            } 
            i++
        }
        return res
    } 

    editSaveNote = (event, noteId) => {

        const editedNote = this.model.getNote(noteId)//event | name, category, content
        const rowNode = this.view.getElement(`[rowId="${noteId}"]`)
        const nameNode = this.view.getElement(`[name="noteName"]`, rowNode)
        const selectorNode = this.view.getElement(`[name="noteCategory"]`, rowNode)
        const contentNode = this.view.getElement(`[name="noteContent"]`, rowNode)
            editedNote.name = nameNode.textContent
            editedNote.content = contentNode.textContent
            editedNote.category = selectorNode.children.category.value

        console.log(`save note`, editedNote)

        const newNotes = this.model.edit(noteId, editedNote)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary) 
        
        this.editNoteFlag = false
    }

    archiveNoteToggle = (_, noteId) => {

        const newNotes = this.model.noteArchiveToggle(noteId)
        const newSummary = this.model.summaryTable()
        this.view.updateNotesTable(newNotes)               
        this.view.updateSummaryTable(newSummary)  
    }

    showCreateNotePopUp = (ev = {}) => {

        this._onHandler(ev)
        const selectors = {selectorsRemove: ['popupHidden']} 
        const desc = '.noteAddPopUp'
        this.view.showNoteAddPopUp(desc, selectors)
        this.createNotePopUpFlag = true
    }

    hideCreateNotePopUp = (ev = {}) => {

        this._onHandler(ev)
        const selectors = {selectorsAdd: ['popupHidden']} 
        const desc = '.noteAddPopUp'
        this.view.hideNoteAddPopUp(desc, selectors)
        this.createNotePopUpFlag = false
    }

    changeCategoryIconOnEdit = (event = {}, noteId) => {
        //noteId empty
        this._onHandler(event)
        const newNote = {'category': ''}//event... | category
        const {name, value} = event.target;
        newNote[name] = value 
   
        this.view.changeCategoryIconEditNote(noteId, newNote.category)
        console.log(`change icon on Edit`, newNote, noteId)
    }

    changeCategoryIconOnAdd = (event = {}) => {

        this._onHandler(event)
        const newNote = {'category': ''}//event... | category
        const {name, value} = event.target;
        newNote[name] = value 
   
        this.view.changeCategoryIconAddPopUp(event, newNote.category)
    }
} 