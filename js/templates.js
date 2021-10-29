import * as dateHelper from './dateHelper.js';

const notesTableHeader = () => `<ul class="tableHead">
                <li>Name</li>
                <li>Created</li>
                <li>Category</li>
                <li>Content</li>
                <li>Dates</li>
                <li><ul name="headerNoteControls">
                      <li name="archiveToggle"><i class="fa fa-archive" action="archiveActiveToggle" data-tooltip="To archived notes" aria-hidden="true"></i></li>
                      <li name="removeAllNotes"><i class="fa fa-trash" action="removeAll" data-tooltip="Remove all" aria-hidden="true"></i></li>
                    </ul>
                </li>
            </ul>`;

const createNoteButton = () => `<button action="showPopUp" id="createNoteButton" type="button">Create note</button>`
const hideNotePopUpButton = () => `<button class="closeButton" action="closePopUp">X</button>`

const icon = (selector) => `<i class="${selector}" aria-hidden="true"></i>`

const notesSummaryTableHeader = () => `<ul class="tableHead">
                                          <li>Category</li>
                                          <li>Active</li>
                                          <li>Archived</li>
                                      </ul>`;

const noRecords = () => `<ul class="noteRow">
                            <li>You haven't any recorded notes</li>
                        </ul>`;

const noteRowTemplate = (row = {}) => `<ul class="noteRow" rowId="${row.id}"> 
                <li name="noteIcon">
                    <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li name="noteName">${row.name}</li>
                <li>${dateHelper.convertDate(row.dateCreated)}</li>
                <li name="noteCategory">${row.category}</li>
                <li name="noteContent">${row.content}</li>
                <li>${(() => (row.dateEdited ? `${row.dateCreated}, ${row.dateEdited}`
    : row.dateCreated)
  )(row)}</li>
                <li name="noteControls">
                  <ul class="controlButtonsWrap" >
                    <li name="editNoteControl"><i class="fa fa-pencil" action="onEdit" data-tooltip="Edit note" aria-hidden="true"></i></li>
                    <li name="archiveNoteControl"><i class="fa fa-archive" action="archive" data-tooltip="To Archive" aria-hidden="true"></i></li>
                    <li name="removeNoteControl"><i class="fa fa-trash" action="remove" data-tooltip="Remove note" aria-hidden="true"></i></li>
                  </ul>
                </li>  
            </ul>`;

const noteOnEditControls = () => `<ul class="controlButtonsWrap" >
          <li name="saveNoteControl"><i class="fa fa-floppy-o" action="editSave" data-tooltip="Save note" aria-hidden="true"></i></li>
          <li name="cancelNoteControl"><i class="fa fa-undo" action="onEditCancel" data-tooltip="Cancel editing" aria-hidden="true"></i></li>
        </ul>`


const noteRowSummaryTemplate = (row = {}) => `<ul class="noteRow"> 
                <li class="noteIcon">
                  <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.category}</li>
                <li>${row.active}</li>
                <li>${row.archived}</li>
            </ul>`;

const categoryIconEl = (classes = []) => `<i class="${classes.join(' ')}" aria-hidden="true"></i>`;

const categoriesSelector = (noteCategories = [], defaultValue = '', action = 'popUpChangeCategory') =>  
            `<select id="categories" name="category" action="${action}">
                ${defaultValue ? '' : '<option selected disabled hidden>Choose cat</option>'}
                ${noteCategories.map((cat) => `<option value='${cat}' ${cat === defaultValue ? 'selected' : ''}>${cat}</option>`)}
            </select>`;

const addNotePopUp = (noteCategories = []) => `<div class="noteAddPopUp">
                    <!--close button at this place injected into view-->
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
  createNoteButton, hideNotePopUpButton, noteOnEditControls, icon
};
