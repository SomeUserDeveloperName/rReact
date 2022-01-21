import * as dateHelper from '../helpers/dateHelper.js';
const noteRowTemplate = (row = {}) => `<ul class="noteRow" rowId="${row.id}"> 
                <li name="noteIcon">
                    <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li name="noteName">${row.name}</li>
                <li name="noteCreated">${dateHelper.convertDate(row.dateCreated)}</li>
                <li name="noteCategory">${row.category}</li>
                <li name="noteContent">${row.content}</li>
                <li name="noteDates">${(() => (row.dateEdited ? `${row.dateCreated}, ${row.dateEdited}`
    : row.dateCreated)
  )(row)}</li>
                <li name="noteControls">
                  <ul class="controlButtonsWrap" >
                    <li name="editNoteControl"><i class="fa fa-pencil fa-lg" action="onEdit" data-tooltip="Edit note" aria-hidden="true"></i></li>
                    <li name="archiveNoteControl"><i class="fa fa-archive fa-lg" action="archive" data-tooltip="To Archive" aria-hidden="true"></i></li>
                    <li name="removeNoteControl"><i class="fa fa-trash fa-lg" action="remove" data-tooltip="Remove note" aria-hidden="true"></i></li>
                  </ul>
                </li>  
            </ul>`;


const noteRowSummaryTemplate = (row = {}) => `<ul class="noteRow"> 
                <li name="summaryIcon" class="noteIcon">
                  <i class="${row.icon}" aria-hidden="true"></i>
                </li>
                <li name="summaryCategory" class="noteName">${row.category}</li>
                <li name="summaryActive">${row.active}</li>
                <li name="summaryArchived">${row.archived}</li>
            </ul>`;
export { noteRowTemplate, noteRowSummaryTemplate }            
