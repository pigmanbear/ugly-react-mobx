import React from 'react'
import { App } from '../../ui/layouts/app'
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { DropZone } from '../components/dropzone';

export class Upload extends React.Component {
  render () {
    return (
      <App>
        <Grid fluid>
          <p className='text-center'>
            Billing Upload
            <br/><small>Drop files into the well, or click anyhwere inside to upload a file.</small>
            <br /><small>To do: Instruction for file format.</small>
          </p>
          <p>
            <small>Accepted Files for uploading billing include: <em className='fa fa-file-excel-o'>.XLS</em>, <em className='fa fa-file-excel-o'>.XLSX</em>, <em className='fa fa-file-text'>.CSV</em>, <em className='fa fa-file-code-o'>.JSON</em></small>
          </p>
          <br />
          <DropZone />
        </Grid>
      </App>
    )
  }

}
