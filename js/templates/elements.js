const categoryIconEl = (classes = []) => `<i class="${classes.join(' ')}" aria-hidden="true"></i>`;

const categoriesSelector = (noteCategories = [], defaultValue = '', action = 'popUpChangeCategory') =>  
            `<select id="categories" name="category" action="${action}">
                ${defaultValue ? '' : '<option selected disabled hidden>Choose cat</option>'}
                ${noteCategories.map((cat) => `<option value='${cat}' ${cat === defaultValue ? 'selected' : ''}>${cat}</option>`)}
            </select>`;

const noteOnEditControls = () => `<ul class="controlButtonsWrap" >
          <li name="saveNoteControl"><i class="fa fa-floppy-o" action="editSave" data-tooltip="Save note" aria-hidden="true"></i></li>
          <li name="cancelNoteControl"><i class="fa fa-undo" action="onEditCancel" data-tooltip="Cancel editing" aria-hidden="true"></i></li>
        </ul>`
        
const icon = (selector) => `<i class="${selector}" aria-hidden="true"></i>`


const noRecords = () => `<ul class="noteRow">
                            <li>You haven't any recorded notes</li>
                        </ul>`;

export { categoryIconEl, categoriesSelector, noteOnEditControls, icon, noRecords }