import { categoriesSelector } from "./elements.js";

const addNotePopUp = (noteCategories = []) => 
                `<div class="noteAddPopUp">
                    <!--close button at this place injected into view-->
                    <form action="addNewNote">
                      <fieldset>
                        <span id="popUpAddIcon"></span>
                        <label>Name: <input type="text" name="name" maxlength="50"></label>
                        <label>Category: ${categoriesSelector(noteCategories)}</label>
                        <label>Content: <textarea name="content" rows="1" cols="70"></textarea></label>
                      </fieldset>
                      <div class="popUpControls"> 
                        <button type="submit">Create</button> 
                        <input type="reset" value="Clear">
                      </div>
                    </form>
                </div>`;
export { addNotePopUp }