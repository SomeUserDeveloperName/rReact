
const notesTableHeader = () => `<ul class="tableHead">
                                    <li>Name</li>
                                    <li>Created</li>
                                    <li>Category</li>
                                    <li>Content</li>
                                    <li>Dates</li>
<li>
    <ul name="headerNoteControls">
        <li name="archiveToggle">
            <i class="fa fa-archive" action="archiveActiveToggle" data-tooltip="Show archived notes" aria-hidden="true"></i>
        </li>
        <li name="removeAllNotes">
            <i class="fa fa-trash" action="removeAll" data-tooltip="Remove all active" aria-hidden="true"></i>
        </li>
    </ul>
</li>
                                </ul>`;

const notesSummaryTableHeader = () => `<ul class="tableHead">
                                            <li>Category</li>
                                            <li>Active</li>
                                            <li>Archived</li>
                                        </ul>`;

export { notesTableHeader, notesSummaryTableHeader }