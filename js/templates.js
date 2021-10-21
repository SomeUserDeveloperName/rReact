import * as dateHelper from "./dateHelper.js"

const notesTableHeader = () => {
    return `<ul class="tableHead">
                <li>Name</li>
                <li>Created</li>
                <li>Category</li>
                <li>Content</li>
                <li>Dates</li>
                <li>
                    <i class="fa fa-archive" aria-hidden="true" action="archiveActiveToggle"></i>
                    <i class="fa fa-trash" aria-hidden="true" action="removeAll"></i>
                </li>
            </ul>`
}

const notesSummaryTableHeader = () => {
    return  `<ul class="tableHead">
                <li>Category</li>
                <li>Active</li>
                <li>Archived</li>
            </ul>`
}

const noRecords = () => {
    return  `<ul class="noteRow">
                <li>You haven't any recorded notes</li>
            </ul>`
}

const noteRowTemplate = (row = {}) => {
    
    return `<ul class="noteRow"> 
                <li class="noteIcon">
                    <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.name}</li>
                <li>${dateHelper.convertDate(row.dateCreated)}</li>
                <li>${row.category}</li>
                <li>${row.content}</li>
                <li>${(() => row.dateEdited ? `${row.dateCreated}, ${row.dateEdited}`
                                            :    row.dateCreated
                      )(row)}</li>
                  <ul class="controlButtonsWrap" rowId="${row.id}">
                    <li class="control"><i class="fa fa-pencil" aria-hidden="true" action="edit"></i></li>
                    <li class="control"><i class="fa fa-archive" aria-hidden="true" action="archive"></i></li>
                    <li class="control"><i class="fa fa-trash" aria-hidden="true" action="remove"></i></li></ul>
            </ul>`
} 

const noteRowSummaryTemplate = (row = {}) => {
    return  `<ul class="noteRow"> 
                <li class="noteIcon">
                  <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.category}</li>
                <li>${row.active}</li>
                <li>${row.archived}</li>
            </ul>`
}

const categoriesSelector = (noteCategories = [], defaultValue = "") =>  {

    return `<select id="categories" name="categories">
                ${defaultValue ? "" : "<option selected disabled hidden>Choose cat</option>"}                                    
                ${noteCategories.forEach(cat =>
                   `<option value=${cat} ${cat === defaulValue ? "selected": ""}>${cat}</option>`
                )}
            </select>`
}

const addNotePopUp = (noteCategories = []) => {
        return `<div class="noteAddPopUp">
                    <button class="closeButton">X</button>
                     <form>
                     <fieldset>
                        <input type="text" maxlength="50">
                        ${categoriesSelector(noteCategories)}
                        <textarea name="content" rows="1" cols="70"></textarea>
                     </fieldset>
                     <button>Create</button> 
                    </form>
                </div>`
}


export { noteRowTemplate, noteRowSummaryTemplate, notesTableHeader,
         notesSummaryTableHeader, addNotePopUp, categoriesSelector, noRecords }