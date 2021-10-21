import * as templates from "./templates.js"
import * as settings from "./settings.js"
export class View {

    constructor(iconsCategoriesMap = {}){
        this.iconsMap = iconsCategoriesMap
    }

    createTable = (desc, rows = [], events = []) => {

        const tableType = `${desc}Table`;
        const table = this.createEl('section', "", desc, [tableType], events) 

        let tableHeader = tableType == "notesTable" ? templates.notesTableHeader() 
                                                    : templates.notesSummaryTableHeader()

        const tableBody = this.createEl('div', "",  "tableBody", ["tableBody"], [])
        tableHeader = this.editNode(tableHeader)     

        const rowsElArr = this.createRows(rows, tableType)
        console.log(`cre`, rowsElArr)
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
            console.log(`aa`, rowsElArr)//rowsElArr[0].replaceAll(/>(\n)</gm, ""))                                      
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
            //const tableRows = this.editNode(rowsElArr.join(''));
            //console.log(`update`, this.getElement(selector))//, settings.notesTableDescriptor)//, ...rowsElArr)
        (this.getElement(selector)).append(...rowsElArr)//tableRows)
    }
    
    updateSummaryTable = (rows = []) => {

        const selector = `.${settings.summaryTableDescriptor} .tableBody`     
        this.clearTable(selector)
            const rowsElArr = this.createRows(rows, settings.summaryTableDescriptor)
            //const tableRows = this.editNode(rowsElArr.join(''));

        (this.getElement(selector)).append(...rowsElArr)//tableRows)
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

    createNoteAddPopUp = (categories = []) => {
        return this.editNode(templates.addNotePopUp(categories), 
                             {"selectorsAdd": ["popupHidden"]});
    }

    showNoteAddPopUp = () => {

    }

    hideNoteAddPopUp = () => {

    }
    
    getElement = (desc) => {
        return document.querySelector(desc);
    } 

    convertHTMLtoDOM = (str) => {

        let tmp = this.createEl('div')
            tmp.innerHTML = str

        return tmp.firstChild.cloneNode(true);
    }

    editNode = (node, options = {}) => {
       
        if(node instanceof HTMLElement === false){ 
     
            node = this.convertHTMLtoDOM(node)
        } else {
            node = node.cloneNode(true)
        }   
        //console.log(`node`, node)
            if(options.name) node.name = options.name
            if(options.id) node.id = options.id
            if(options.content) node.textContent = options.content

            options.selectorsAdd?.forEach(selector => node.classList.add(selector))
            options.selectorRemove?.forEach(selector => node.classList.remove(selector))

            options.eventsAdd?.forEach(ev => node.addEventListener(ev.type, ev.listener))
            options.eventsRemove?.forEach(ev => node.removeEventListener(ev.type, ev.listener))  

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
