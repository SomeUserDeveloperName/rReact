import * as dateHelper from "./dateHelper.js"

const notesTableHeader = () => {
    return `<ul class="tableHead">
                <li>Name</li>
                <li>Created</li>
                <li>Category</li>
                <li>Content</li>
                <li>Dates</li>
                <li>
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <i class="fa fa-trash" aria-hidden="true"></i>
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
    return  `<ul class="notesTable">
                <li>You haven't any recorded notes</li>
            </ul>`
}

const noteRowTemplate = (row = {}) => {
    
    return `<ul class="noteRow"> 
                <li class="noteIcon">${row.icon}</li>
                <li class="noteName">${row.name}</li>
                <li>${dateHelper.convertDate(row.dateCreated)}</li>
                <li>${row.category}</li>
                <li>${row.content}</li>
                <li>${row.dateCreated}, ${row.dateEdited}</li>
                  <ul class="controlButtonsWrap">
                    <li class="control"><i class="fa fa-pencil" aria-hidden="true"></i></li>
                    <li class="control"><i class="fa fa-archive" aria-hidden="true"></i></li>
                    <li class="control"><i class="fa fa-trash" aria-hidden="true"></i></li></ul>
            </ul>`
} 

// const noteRowEditedTemplate = (row = {}, categories = []) => {
    
//     return `<ul class="noteRow"> 
//                 <li class="noteIcon">${row.icon}</li>
//                 <li class="noteName"><input type="text" value="${row.name}"></li>
//                 <li>${dateHelper.convertDate(row.dateCreated)}</li>
//                 <li><select id="categories" name="categories">
//                         ${noteCategories.forEach(cat =>
//                             `<option value=${cat}>${cat}</option>`
//                         )}
//                     </select>
//                 </li>
//                 <li><input type="text" value="${row.content}"></li>
//                 <li>${row.dateCreated}, ${row.dateEdited}</li>
//                   <ul class="controlButtonsWrap">
//                     <li class="control"><i class="fa fa-floppy-o" aria-hidden="true"></i></li>
//                     <li class="control"><i class="fa fa-archive" aria-hidden="true"></i></li>
//                     <li class="control"><i class="fa fa-trash" aria-hidden="true"></i></li></ul>
//             </ul>`
// } 

const noteRowSummaryTemplate = (row = {}) => {
    return  `<ul class="noteRow"> 
                <li class="noteIcon">${row.icon}</li>
                <li class="noteName">${row.category}</li>
                <li>${row.active}</li>
                <li>${row.archived}</li>
            </ul>`
}

const addNotePopUp = (noteCategories = []) => {
        return `<div class="noteAddPopUp">
                    <button class="closeButton">X</button>
                     <form>
                     <fieldset>
                        <input type="text" maxlength="50">
                        <select id="categories" name="categories">
                            ${noteCategories.forEach(cat =>
                                `<option value=${cat}>${cat}</option>`
                                )}
                        </select>
                        <textarea name="content" rows="1" cols="70"></textarea>
                     </fieldset>
                     <button>Create</button> 
                    </form>
                </div>`
}


export { noteRowTemplate, noteRowSummaryTemplate, notesTableHeader,
         notesSummaryTableHeader, addNotePopUp, noRecords }