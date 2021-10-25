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

    editTableRow = (rowNode, categories = [], defaultCategory = "") => {

        //rowNode.name.contentEditable = true
        //rowNode.content.contentEditable = true
        //rowNode.selector.innerHTML = templates.categoriesSelector(categories, defaultCategory)
        //
        //const options = {"selectorsAdd": ["editableFields"]}
        //this.editNode(rowNode, options)
        //change icons control to icon save
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
        const popUpNode = this.editNode(popUp, {'selectorsAdd': selectors, 'eventsAdd': events})
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

    changeCategoryIconEditNote = (node, category) => {

        const newIcon = this.iconsMap[category];
        
        console.log(`view change`, node, category, newIcon)
    }

    showNoteAddPopUp = (desc, selectors = {}) => {
        const node = this.getElement(desc)
        console.log(`show`, node, selectors)
        this.editNode(node, selectors)

        const createNoteButton = this.getElement('#createNoteButton')
        const addAttribute = {'attributesAdd': [{'name': 'disabled', 'value': true}]}
        console.log(`show`, createNoteButton, addAttribute)
        this.editNode(createNoteButton, addAttribute, false)
    }

    hideNoteAddPopUp = (desc, selectors = {}) => {
        const node = this.getElement(desc)
        this.editNode(node, selectors)

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
