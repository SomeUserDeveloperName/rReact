import * as settings from "./settings.js"

export class Controller {
    constructor(model, view){
        this.model = model
        this.view = view
        this.root = document.querySelector(settings.rootElement);
    }

    buildIndex = () => {
        const nodes = []
      const notesRecords = this.model.notesTable()
      const summaryRecords = this.model.summaryTable()

      const notesTableEvents = [this._onClick].map(hlr => ({"type": "click", "listener": hlr}))
      const notesSummaryTableEvents = [this._onClick].map(hlr => ({"type": "click", "listener": hlr}))
    
      nodes.push(this.view.createNoteAddPopUp())
      nodes.push(this.view.createTable('notes', notesRecords, notesTableEvents))
      nodes.push(this.view.createEl("button","Create note", "", [], []))
      nodes.push(this.view.createTable('summary', summaryRecords, notesSummaryTableEvents))
      
      this.root.append(...nodes)
    }

    _onClick = (ev) => {
        console.log(`controller click`, ev)
    }

    onArchiveActiveNotesToggle = () => {}

    onRemoveAllNotes = () => {}

    onAddNote = () => {}

    onRemoveNote = () => {}

    onEditNote = () => {}

    onShowCreateNotePopUp = () => {}

    onHideCreateNotePopUp = () => {}

    onChangeCategoryIconOnEdit = () => {}

    onChangeCategoryIconOnAdd = () => {}
} 