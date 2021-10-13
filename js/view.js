const createTable = (desc, rows = []) => {
    const table = document.createElement('table')
            table.name = desc
            table.classList.add(`.${desc}Table`) 

    return table        
}

const createEl = (tag, desc = "", elClasses = [], elEvents = [], content = "") => {
    const el = document.createElement(tag)
            el.name = desc;
            elClasses.forEach(elClass => el.classList.add(elClass))
            elEvents.forEach(ev => el.addEventListener(ev.type, ev.listener))
            if(content) el.textContent = content
    return el;        
}

const removeEl = (el, eventsDesc = []) => {
            eventsDesc.forEach(ev => removeEventListener(ev.type, ev.listener))
            el.parentElement.removeChild(el)
    return true            
}
const createRow = (row, id) => {
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
                            <span class="control" onClick=(${edit(this.node, rowId)})>edit</span>
                            <span class="control" onClick=(${archive(this.node, rowId)})>archive</span>
                            <span class="control" onClick=(${remove(this.node, rowId)})>remove</span></div>`
     
    row.append(...cells)

    noteIcon = `<span class="noteIcon">${iconMap[field.category]}</span>`
    noteCategory = `<span>${field.category}</span>`
    notesActive = `<span>${field.active}</span>`
    notesArchived = `<span>${field.archived}</span>`
}


const show

const clearTable = (desc) => {
    document.querySelector(`.${desc}`).removeChild()
}
const 
