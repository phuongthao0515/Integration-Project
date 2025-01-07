
import {BlockNoteView} from "@blocknote/mantine"
import {useCreateBlockNote} from "@blocknote/react"

import "@blocknote/mantine/style.css"
import { useState } from "react"


const Editor = ( {onChange, initialContent ,editable}) => {

  const handleUpload =  (File)=>{
    // return response.url;
  }
  console.log()
  const editor= useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent))
      : undefined,
    uploadFile:handleUpload
  })
 
  return (
    <div>
      <BlockNoteView editor={editor} editable={editable} onChange={()=>onChange(JSON.stringify(editor.document,null,2))}/>
    </div>
  )
}

export default Editor