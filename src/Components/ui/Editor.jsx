import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { useState, useEffect } from 'react';

const Editor = ({ onChange, initialContent, editable }) => {
    const [editorContent, setEditorContent] = useState(initialContent);

    useEffect(() => {
        setEditorContent(initialContent);
    }, [initialContent]);

    const handleUpload = (file) => {
        // Handle file upload logic if needed
    };

    const editor = useCreateBlockNote({
        initialContent: editorContent ? JSON.parse(editorContent) : undefined,
        uploadFile: handleUpload,
    });

    return (
        <div>
            <BlockNoteView
                key={editorContent} // Triggers re-mount when content changes
                editor={editor}
                editable={editable}
                onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
            />
        </div>
    );
};

export default Editor;
