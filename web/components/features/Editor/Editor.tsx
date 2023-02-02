import React, { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export const Editor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)

  const handleChange = (value: Descendant[]) => {
    setValue(value)
  }

  return (
    <div>
      <Slate value={value} editor={editor} onChange={handleChange}>
        <Editable />
      </Slate>
    </div>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello World!' }],
  },
]
