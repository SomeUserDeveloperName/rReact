
const notesTableHeader = () => `<ul class="tableHead">
                                    <li name="notesTHeadName">Name</li>
                                    <li name="notesTHeadCreated">Created</li>
                                    <li name="notesTHeadCategory">Category</li>
                                    <li name="notesTHeadContent">Content</li>
                                    <li name="notesTHeadDates">Dates</li>
<li name="notesTHeadControls">
    <ul name="headerNoteControls">
        <li name="archiveToggle">
            <i class="fa fa-archive fa-lg" action="archiveActiveToggle" data-tooltip="Show archived notes" aria-hidden="true"></i>
        </li>
        <li name="removeAllNotes">
            <i class="fa fa-trash fa-lg" action="removeAll" data-tooltip="Remove all active" aria-hidden="true"></i>
        </li>
    </ul>
</li>
                                </ul>`;

const notesSummaryTableHeader = () => `<ul class="tableHead">
                                            <li name="summaryTHeadCategory">Note Category</li>
                                            <li name="summaryTHeadActive">Active</li>
                                            <li name="summaryTHeadArchived">Archived</li>
                                        </ul>`;

export { notesTableHeader, notesSummaryTableHeader }