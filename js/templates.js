import * as dateHelper from './dateHelper.js';

const notesTableHeader = () => `<ul class="tableHead">
                <li>Name</li>
                <li>Created</li>
                <li>Category</li>
                <li>Content</li>
                <li>Dates</li>
                <li>
                    <i class="fa fa-archive" aria-hidden="true" action="archiveActiveToggle"></i>
                    <i class="fa fa-trash" aria-hidden="true" action="removeAll"></i>
                </li>
            </ul>`;

const createNoteButton = () => `<button action="showPopUp" id="createNoteButton" type="button">Create note</button>`

const notesSummaryTableHeader = () => `<ul class="tableHead">
                <li>Category</li>
                <li>Active</li>
                <li>Archived</li>
            </ul>`;

const noRecords = () => `<ul class="noteRow">
                <li>You haven't any recorded notes</li>
            </ul>`;

const noteRowTemplate = (row = {}) => `<ul class="noteRow"> 
                <li class="noteIcon">
                    <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.name}</li>
                <li>${dateHelper.convertDate(row.dateCreated)}</li>
                <li>${row.category}</li>
                <li>${row.content}</li>
                <li>${(() => (row.dateEdited ? `${row.dateCreated}, ${row.dateEdited}`
    : row.dateCreated)
  )(row)}</li>
                  <ul class="controlButtonsWrap" rowId="${row.id}">
                    <li class="control"><i class="fa fa-pencil" aria-hidden="true" action="edit"></i></li>
                    <li class="control"><i class="fa fa-archive" aria-hidden="true" action="archive"></i></li>
                    <li class="control"><i class="fa fa-trash" aria-hidden="true" action="remove"></i></li></ul>
            </ul>`;

const noteRowSummaryTemplate = (row = {}) => `<ul class="noteRow"> 
                <li class="noteIcon">
                  <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.category}</li>
                <li>${row.active}</li>
                <li>${row.archived}</li>
            </ul>`;

const categoryIconEl = (classes = []) => `<i class="${classes.join(' ')}" aria-hidden="true"></i>`;

const categoriesSelector = (noteCategories = [], defaultValue = '') =>  
            `<select id="categories" name="category" action="popUpChangeCategory">
                ${defaultValue ? '' : '<option selected disabled hidden>Choose cat</option>'}
                ${noteCategories.map((cat) => `<option value='${cat}' ${cat === defaultValue ? 'selected' : ''}>${cat}</option>`)}
            </select>`;

const addNotePopUp = (noteCategories = []) => `<div class="noteAddPopUp">
                    <button class="closeButton" action="closePopUp">X</button>
                    <form action="addNewNote">
                      <fieldset>
                          <span id="popUpAddIcon"></span>
                          <input type="text" name="name" maxlength="50">
                          ${categoriesSelector(noteCategories)}
                          <textarea name="content" rows="1" cols="70"></textarea>
                      </fieldset>
                      <button type="submit">Create</button> 
                      <input type="reset" value="Clear">
                    </form>
                </div>`;

export {
  noteRowTemplate, noteRowSummaryTemplate, notesTableHeader, categoryIconEl,
  notesSummaryTableHeader, addNotePopUp, categoriesSelector, noRecords,
  createNoteButton
};
