import { categoriesSelector } from "./elements.js";

const addNotePopUp = (noteCategories = []) => 
                `<div class="noteAddPopUp">
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
export { addNotePopUp }