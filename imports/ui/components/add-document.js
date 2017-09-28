import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
/*import { insertDocument } from '../../api/documents/methods.js';

const handleInsertDocument = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    insertDocument.call({
      title,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Document added!', 'success');
      }
    });
  }
};*/

const handleInsertPlaceholder = (event) => {

  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
Bert.alert('Nothing really Happened, but it will when this is complete :)', 'success');
  }
};

export const AddDocument = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertPlaceholder }
      placeholder="Type a document title and press enter..."
    />
  </FormGroup>
);