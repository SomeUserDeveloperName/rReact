import * as templates from "./templates/templates.js"
export class View {

    constructor(settings = {}){
        this.settings = settings
        this.iconsMap = this.settings.iconsCategoriesMap || {}
    }

    createTable = (desc, rows = [], events = []) => {

        const tableType = `${desc}Table`;
        const table = this.createEl('section', "", desc, [tableType], events) 

        let tableHeader = tableType == "notesTable" ? templates.notesTableHeader() 
                                                    : templates.notesSummaryTableHeader()

        const tableBody = this.createEl('div', "",  "tableBody", ["tableBody"], [])
        tableHeader = this.editNode(tableHeader)     

        const rowsElArr = this.createRows(rows, tableType)
        //console.log(`edit Note`, rowsElArr.join(''))
        const tableRows = rowsElArr//this.editNode(rowsElArr.join(''))//.replaceAll(/[ \n]/gm, ""));
        //console.log(`table rows`, tableRows)
        tableBody.append(...tableRows)
            table.append(tableHeader, tableBody)
        return table        
    }

    createRows = (rows = [], tableType) => {

        const template = tableType == "notesTable" ? "noteRowTemplate" : "noteRowSummaryTemplate";
        const rowsElArr = rows.length ? rows.map(row => {
            return templates[template]({"icon": this.iconsMap[row.category], ...row})}
           ) 
                                      : [templates.noRecords()]
            //console.log(`aa`, rowsElArr)//rowsElArr[0].replaceAll(/>(\n)</gm, ""))                                      
            const domRows = rowsElArr.map(el => this.editNode(el))
        return domRows                                 
    }

    updateNotesTable = (rows = []) => {

        const selector = `.${this.settings.notesTableDescriptor} .tableBody`   
        this.clearTable(selector)
            const rowsElArr = this.createRows(rows, this.settings.notesTableDescriptor)

        this.getElement(selector).append(...rowsElArr)
    }
    
    updateSummaryTable = (rows = []) => {

        const selector = `.${this.settings.summaryTableDescriptor} .tableBody`     
        this.clearTable(selector)
            const rowsElArr = this.createRows(rows, this.settings.summaryTableDescriptor)
    
        this.getElement(selector).append(...rowsElArr)
    }

    clearTable = (selector) => {

        Array.from(this.getElement(selector).children).forEach(el => this.removeEl(el))
    }

    editTableRow = (note = {}, categories = []) => {

        const rowNode = this.getElement(`[rowId="${note.id}"]`)
        const nameNode = this.getElement(`[name="noteName"]`, rowNode)
        const selectorNode = this.getElement(`[name="noteCategory"]`, rowNode)
        const contentNode = this.getElement(`[name="noteContent"]`, rowNode)
        const controlsNode = this.getElement(`[name="noteControls"]`, rowNode)

        console.log(`rowNode`, rowNode, nameNode, selectorNode, contentNode)

        const defaultCategory = note.category
        nameNode.contentEditable = true
        contentNode.contentEditable = true
        const actionType = 'noteEditChangeCategory'
        selectorNode.innerHTML = templates.categoriesSelector(categories, defaultCategory, actionType)
        controlsNode.innerHTML = templates.noteOnEditControls()
    }

    editedRowSave = () => {

    }

    createButtonCreateNote = (selectors = [], events = []) => {
        const container = this.createEl('section', '', '', ['button_container'])
        const button = templates.createNoteButton()
            container.appendChild(this.editNode(button, {'eventsAdd': events}))
        return container;
    }

    createNoteAddPopUp = (categories = [], selectors = [], events = []) => {
        const section = this.createEl('section', '', '', ['sectionPopUp'])
        const popUp = templates.addNotePopUp(categories);
        const popUpNode = this.editNode(popUp, {'selectorsAdd': selectors,
                                                'eventsAdd': events.filter(e => e.type !== 'click')}, true)

        const closeButtonTemplate = templates.hideNotePopUpButton()
        const closeButton = this.editNode(closeButtonTemplate, 
                                          {'eventsAdd': events.filter(e => e.type === 'click')}, true)
               popUpNode.insertBefore(closeButton, popUpNode.firstChild)

        const categoryIcon = templates.categoryIconEl()
        const categoryIconNode = this.editNode(categoryIcon)
        const categoryIconParentNode = this.getElement('#popUpAddIcon', popUpNode)
              categoryIconParentNode.appendChild(categoryIconNode)
               
               section.appendChild(popUpNode)
        return section;
    }

    changeCategoryIconAddPopUp = (node, category) => {

        const newIconClass = this.iconsMap[category];
        const newIcon = templates.categoryIconEl([newIconClass])
        const newIconNode = this.editNode(newIcon)

        const popUpIconNode = this.getElement('#popUpAddIcon', node)
           Array.from(popUpIconNode.children).forEach(child => popUpIconNode.removeChild(child))
           popUpIconNode.appendChild(newIconNode)
    }

    changeCategoryIconEditNote = (noteId, category) => {
        //need refactoring
        const newIconSelector = this.iconsMap[category];
        const rowNode = this.getElement(`[rowId="${noteId}"]`)
        const iconNode = this.getElement(`[name="noteIcon"]`, rowNode)
              iconNode.innerHTML = templates.icon(newIconSelector)
        console.log(`view change`, noteId, category, newIconSelector, rowNode)
    }

    activeArchiveNotesToggle = (showArchive = false) => {

        const toolTipHead = {archiveCtrl: {true: 'Show active notes', false: 'Show archived notes'},
                              removeCtrl: {true: 'Remove all archived', false: 'Remove all active'}}                 

        const toolTipNote = {archiveCtrl: {true: 'Move to active', false: 'Move to archive'}} 

        const headIcons = {archiveCtrl: {true: 'fa-upload', false: 'fa-archive'}}
        const noteIcons = {archiveCtrl: {true: 'fa-upload', false: 'fa-archive'}}

        const tableSelectors = {true: ['archiveRecordsShow'], false: []}

        //(Show all (archived|active) notes tool-tip and icon at table Head
        const archiveToggleNode = this.getElement('[action="archiveActiveToggle"]')
        const archiveToggleAttr = {attributesReplace: [{name: 'data-tooltip', value: toolTipHead.archiveCtrl[showArchive]}]}
        const archiveToggleSelectors = {'selectorsRemove': [headIcons.archiveCtrl[!showArchive]], 
                                           'selectorsAdd': [headIcons.archiveCtrl[showArchive]]}
        this.editNode(archiveToggleNode, archiveToggleAttr, false)
        this.editNode(archiveToggleNode, archiveToggleSelectors, false)

        //Remove all (active|archived) notes tool-tip at table Head
        const removeAllNotesNode = this.getElement('[action="removeAll"]')
        const removeAllNotesAttr = {attributesReplace: [{name: 'data-tooltip', value: toolTipHead.removeCtrl[showArchive]}]}
        this.editNode(removeAllNotesNode, removeAllNotesAttr, false)

        //Change all (to|from) archive icon for every note row
        const archiveActiveButtonNodes = this.getElements('[name="archiveNoteControl"] [action="archive"]')
        const archiveActiveButtonAttr = {attributesReplace: [{name: 'data-tooltip', value: toolTipNote.archiveCtrl[showArchive]}]}
        const archiveActiveButtonSelectors = {'selectorsRemove': [noteIcons.archiveCtrl[!showArchive]], 
                                                 'selectorsAdd': [noteIcons.archiveCtrl[showArchive]]}

        Array.from(archiveActiveButtonNodes).forEach(node => {
            this.editNode(node, archiveActiveButtonAttr, false)
            this.editNode(node, archiveActiveButtonSelectors, false)
        })

        //Table view on showing (active|archived) records
        const notesTable = this.getElement('.tableHead')
        const notesTableSelectors = {'selectorsRemove': tableSelectors[!showArchive], 
                                        'selectorsAdd': tableSelectors[showArchive]}
        this.editNode(notesTable, notesTableSelectors, false)
    }

    showNoteAddPopUp = (desc, selectors = {}) => {
        const popUpNode = this.getElement(desc)
        this.editNode(popUpNode, selectors, false)
        this.editNode(popUpNode.parentNode, {'selectorsAdd': selectors['parent']}, false)
        
        const createNoteButton = this.getElement('#createNoteButton')
        const addAttribute = {'attributesAdd': [{'name': 'disabled', 'value': true}]}
        this.editNode(createNoteButton, addAttribute, false)
    }

    hideNoteAddPopUp = (desc, selectors = {}) => {
        const popUpNode = this.getElement(desc)
        this.editNode(popUpNode, selectors, false)
        this.editNode(popUpNode.parentNode, {'selectorsRemove': selectors['parent']}, false)

        const createNoteButton = this.getElement('#createNoteButton')
        const removeAttribute = {'attributesRemove': [{'name': 'disabled', 'value': false}]}
        this.editNode(createNoteButton, removeAttribute, false)
    }
    
    getElement = (desc, node = {}) => {
        return (node instanceof HTMLElement ? node : document).querySelector(desc);
    } 

    getElements = (desc, node = {}) => {
        return (node instanceof HTMLElement ? node : document).querySelectorAll(desc);
    } 

    convertHTMLtoDOM = (str) => {

        let tmp = this.createEl('div')
            tmp.innerHTML = str

        return tmp.firstChild.cloneNode(true);
    }

    editNode = (nodeDOM, options = {}, clone = true) => {

        let node = nodeDOM
        if(nodeDOM instanceof HTMLElement === false){ 
     
            node = this.convertHTMLtoDOM(nodeDOM)
        } 
        if(clone){
            node = node.cloneNode(true)
        }   
            if(options.name) node.name = options.name
            if(options.id) node.id = options.id
            if(options.content) node.textContent = options.content

            options.selectorsRemove?.forEach(selector => node.classList.remove(selector))
            options.selectorsAdd?.forEach(selector => node.classList.add(selector))
        
            options.eventsRemove?.forEach(ev => node.removeEventListener(ev.type, ev.listener))  
            options.eventsAdd?.forEach(ev => node.addEventListener(ev.type, ev.listener))
           
            options.attributesRemove?.forEach(attr => node.removeAttribute(attr.name))
            options.attributesAdd?.forEach(attr => node.setAttribute(attr.name, attr.value))

            options.attributesReplace?.forEach(attr => { 
                node.removeAttribute(attr.name)
                node.setAttribute(attr.name, attr.value)
            })
           
        return node    
    }

    createEl = (tag, content = "", desc = "", elClasses = [], elEvents = []) => {
        const el = document.createElement(tag)
              el.name = desc;
              elClasses.forEach(elClass => el.classList.add(elClass))
              elEvents.forEach(ev => el.addEventListener(ev.type, ev.listener))
              if(content) el.textContent = content
    return el;        
    }
    
    removeEl = (el, eventsDesc = []) => {
      
        eventsDesc.forEach(ev => el.removeEventListener(ev.type, ev.listener))
        el.parentNode.removeChild(el)
    return true            
    }
}
