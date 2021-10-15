import * as templates from "./templates.js"
export class View {

    constructor(){}

    createTable = (desc, rows = []) => {
        const tableType = `${desc}Table`;
        const table = this.createEl('section', "", desc, [tableType]) 
        const template = tableType == "notesTable" ? "noteRowTemplate" : "noteRowSummaryTemplate";

        let tableHeader = tableType == "notesTable" ? templates.notesTableHeader() 
                                                      : templates.notesSummaryTableHeader()

        tableHeader = this.editNode(tableHeader, {"selectorsAdd": ['tableHead']})        

                const rowsElArr = rows.length ? rows.map(row => templates[template](row)) 
                                              : [templates.noRecords()]

        let tableRows = this.editNode(rowsElArr.join(''));
        table.append(tableHeader, tableRows) //innerHTML = `${tableHeader}${rowsElArr.join()}`
        return table        
    }

    clearTable = (desc) => {
        this.getElement(desc).innerHTML = ""
        return true
    }

    editTableRow = (rowNode) => {
        
    }

    createNoteAddPopUp = () => {

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
/*const createRow = (row, id) => {
    const row = createEl('div', id, [], [], "")
    const cells = row.map(field => createEl('td', '', [], [], field))
    cells.map(cell => cell.appendChild(createEl('span', '', [], [])).textContent = )
        noteIcon = `<span class="noteIcon">${iconMap[field.category]}</span>`
        noteName =`<span class="noteName">${field.name}</span>`
        noteCreated = `<span>${field.dateCreated}</span>`
        noteCategory = `<span>${field.category}</span>`
        noteContent = `<span>${field.content}</span>`
        noteChangedDate = `<span>${field.dateCreated}, ${field.dateEdited}</span>`;
        controlButtons = `<div class="controlButtonsWrap">
                            <span class="control" onClick=(${edit(this, noteId)})>edit</span>
                            <span class="control" onClick=(${archive(this, noteId)})>archive</span>
                            <span class="control" onClick=(${remove(this, noteId)})>remove</span></div>`
     
    row.append(...cells)

    noteIcon = `<span class="noteIcon">${iconMap[field.category]}</span>`
    noteCategory = `<span>${field.category}</span>`
    notesActive = `<span>${field.active}</span>`
    notesArchived = `<span>${field.archived}</span>`
}*/

const clearTable = (desc) => {

    Array.from(document.querySelector(`.${desc}`).children)
         .forEach(el => removeEl(el))
    //document.querySelector(`.${desc}`).removeChild()
}
