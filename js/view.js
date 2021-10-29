import * as templates from "./templates.js"
import * as settings from "./settings.js"
export class View {

    constructor(iconsCategoriesMap = {}){
        this.iconsMap = iconsCategoriesMap
        this.popUpNode = ''
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
            const map = rowsElArr.map(el => this.editNode(el))
            console.log(`map`, map)
        return    map
                                      //console.log(`html rows`, rowsElArr, rows)
        //return rowsElArr                                  
    }

    updateNotesTable = (rows = []) => {

        const selector = `.${settings.notesTableDescriptor} .tableBody`   
        this.clearTable(selector)
            const rowsElArr = this.createRows(rows, settings.notesTableDescriptor)

        this.getElement(selector).append(...rowsElArr)
    }
    
    updateSummaryTable = (rows = []) => {

        const selector = `.${settings.summaryTableDescriptor} .tableBody`     
        this.clearTable(selector)
            const rowsElArr = this.createRows(rows, settings.summaryTableDescriptor)
    
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
        const button = templates.createNoteButton()
        return this.editNode(button, {'eventsAdd': events})//this.createEl("button","Create note", "", selectors, events)
    }

    createNoteAddPopUp = (categories = [], selectors = [], events = []) => {
     
        //console.log(`popup`, categories)
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
        console.log(`popup`, popUpNode, categoryIconNode)
       // this.popUpNode = popUpNode
        return popUpNode;
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

    showNoteAddPopUp = (desc, selectors = {}) => {
        const popUpNode = this.getElement(desc)
        console.log(`show`, popUpNode, selectors)
        this.editNode(popUpNode, selectors, false)

        const createNoteButton = this.getElement('#createNoteButton')
        const addAttribute = {'attributesAdd': [{'name': 'disabled', 'value': true}]}
        console.log(`show`, createNoteButton, addAttribute)
        this.editNode(createNoteButton, addAttribute, false)
    }

    hideNoteAddPopUp = (desc, selectors = {}) => {
        const popUpNode = this.getElement(desc)
        console.log(`hide`, popUpNode, selectors)
        this.editNode(popUpNode, selectors, false)

        const createNoteButton = this.getElement('#createNoteButton')
        const removeAttribute = {'attributesRemove': [{'name': 'disabled', 'value': false}]}
        console.log(`hide`, createNoteButton, removeAttribute)
        this.editNode(createNoteButton, removeAttribute, false)
    }
    
    getElement = (desc, node = {}) => {
        return (node instanceof HTMLElement ? node : document).querySelector(desc);
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
        //console.log(`node`, node)
            if(options.name) node.name = options.name
            if(options.id) node.id = options.id
            if(options.content) node.textContent = options.content

            options.selectorsAdd?.forEach(selector => node.classList.add(selector))
            options.selectorsRemove?.forEach(selector => node.classList.remove(selector))

            options.eventsAdd?.forEach(ev => node.addEventListener(ev.type, ev.listener))
            options.eventsRemove?.forEach(ev => node.removeEventListener(ev.type, ev.listener))  

            options.attributesAdd?.forEach(attr => { node.setAttribute(attr.name, attr.value)
                console.log(`edit node set Attr`, node, attr)
            })
            options.attributesRemove?.forEach(attr => node.removeAttribute(attr.name, attr.value))

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
