import * as dateHelper from '../helpers/dateHelper.js';
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


const noteRowSummaryTemplate = (row = {}) => `<ul class="noteRow"> 
                <li class="noteIcon">
                  <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li class="noteName">${row.category}</li>
                <li>${row.active}</li>
                <li>${row.archived}</li>
            </ul>`;
export { noteRowTemplate, noteRowSummaryTemplate }            
