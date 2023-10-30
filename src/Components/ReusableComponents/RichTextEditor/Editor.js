import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Editor = ({ value, setFieldValue }) => {
  return (
    <div style={{ maxWidth: '100%', wordBreak: 'break-word' }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue(data);
          console.log({ event, editor, data });
        }}
        config={{
          toolbar: {
            items: [
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote',
            ],
          },
          enterMode: 2, // This sets the Enter key behavior to create a new paragraph.
          shiftEnterMode: 1, // This sets the Shift+Enter key behavior to create a line break.
          wordBreak: 'break-word',
        }}
        onReady={editor => {
          editor.editing.view.change(writer => {
            writer.setStyle(
              'max-height',
              '344px',
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              'min-height',
              '75px',
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              'padding-left',
              '16px',
              editor.editing.view.document.getRoot()
            );

            // you can add style here whatever you want for example:
            writer.setStyle(
              'z-index',
              '999999 !important',
              editor.editing.view.document.getRoot()
            );
          });
        }}
      />
    </div>
  );
};
export default Editor;
