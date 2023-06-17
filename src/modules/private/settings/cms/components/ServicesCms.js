import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box } from '@mui/material';

const ServiceCms = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    // Save the rawContent to the server or perform other actions
  };

  // If you have the rawContent fetched from the server, you can initialize the editor state like this:
  // const rawContentFromServer = ...; // Raw content fetched from the server
  // const initialEditorState = EditorState.createWithContent(convertFromRaw(rawContentFromServer));
  // const [editorState, setEditorState] = useState(initialEditorState);

  return (
    <>
      <Box>
        <Box sx={{paddingBottom:"10%"}}>
          <div>
            <h5>Services 1</h5>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Box>
        <Box sx={{paddingBottom:"10%"}}>
          <div>
            <h5>Services 2</h5>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Box>
        <Box sx={{paddingBottom:"10%"}}>
          <div>
            <h5>Services 3</h5>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ServiceCms;
