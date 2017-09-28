import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Row,
    Grid,
    Alert,
    Pager,
    Col
} from 'react-bootstrap';
import DropzoneComponent from 'react-dropzone-component';
import {
    upload,
    processBillingsUpload
} from '../../api/billings/methods';
import {
    processExcel
} from '../../modules/xlsx/process';
import {
    Meteor
} from 'meteor/meteor';
import {
    Bert
} from 'meteor/themeteorchef:bert';
import Griddle from 'griddle-react';
import _ from 'underscore';
import __ from 'lodash';
import { camelize } from '../../modules/camelize';
import { insertBilling } from '../../../imports/api/billings/methods';
import numeral from 'numeral';

export class DropZone extends React.Component {
    constructor(props) {
        super(props);
        const fileUpload = (file) => {
            upload(file)
                .then((result) => {
                    Bert.alert('Upload success', 'success');
                    console.log(result);
                    //this.dropzone.removeFile(file);
                    try {
                        Meteor.setTimeout(() => {
                            processFile(result._id);
                        }, 3500);
                    } catch (e) {
                        Bert.alert('Error Processing File', 'warning');
                    }
                })
                .catch((error) => {
                    Bert.alert('Something went wrong! File Not Successfully Uploaded.', 'danger');
                    console.log('Error', error);
                });
        };

        const processFile = (id) => {
            Bert.alert('Now let\'s process the file . . .', 'info');
            Meteor.setTimeout(() => {
                Meteor.call('billingUpload', id, (e, r) => {
                    if (e) {
                        console.log('Error: ', e);
                        Bert.alert('There was an error processing file', 'warning');
                    } else {
                        console.log('Success', r);
                        if (r.readable === true)
                            Bert.alert('File successfully processed!', 'success');
                        else
                            Bert.alert('There was an error processing file', 'warning');
                    }
                });
            }, 500);
        };
        this.state = {
            files: [],
            jdatas: [],
            filled: false,
        };
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "text/csv,.xlsx,.xls,text/json",
            autoProcessQueue: false,
            dictDefaultMessage: '<em class="fa fa-upload fa-3x"></em> Drop files here to upload', // default messages before first drop
            paramName: 'file', // The name that will be used to transfer the file
            uploadMultiple: false,
            parallelUploads: 1,
            maxFiles: 50,
            maxFilesize: 2, // MB
        };

        this.componentConfig = {
            iconFiletypes: ['.xls', '.xlsx', '.csv', '.json'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };
        this.dropzone = null;
        this.addedFile = (file) => {
            console.log('Added file: ' + file);

            if (file) {
                var files = this.state.files;

                if (!files) {
                    files = [];
                }

                files.push(file);

                this.setState({
                    files: files
                });
            }

            async function getJson(file) {
                try {
                    let j = await processExcel(file);
                    return j;
                } catch (e) {
                    console.log(e);
                }
            }
            if (file.type !== "text/csv") {
                getJson(file).then((result) => {
                    if (result) {
                        var jdatas = this.state.jdatas;
                        let jdata = {};
                        console.log(result);
                        let fileKey = file.name + this.state.files.indexOf(file);
                        for (let key in result)
                            if (result.hasOwnProperty(key)) {
                                jdata[fileKey] = result[key];
                            }

                        jdatas.push(jdata);
                        this.setState({
                            jdatas: jdatas
                        });
                    }
                });
            }
        };

        this.sending = (file) => {
            console.log(file);
            fileUpload(file);
        };
        this.complete = (file) => {
            this.dropzone.removeFile(file);
        };
        const getFileName = (file) => {
            if(file)
             return file.name + this.state.files.indexOf(file); 
            else 
             return '';
        };
        const findFile = (jdatas, file) => {
            var fileName = getFileName(file);
            let f = jdatas.find(getNode);
            function getNode(node){
                let s = node.hasOwnProperty(fileName);
                return s;
            }
            return f;
        };
        this.removedFile = (file) => {
            var jdatas = this.state.jdatas;
            var files = this.state.files;
            var dz = this.dropzone;
/*            if (file) {
                if (jdatas && jdatas.length > 0) {
                    for (let i = jdatas.length-1; i>0; i--) {

                    }
                    this.setState({
                        jdatas: jdatas
                    });
                }
            }*/
            if (file) {
                if (files && files.length > 0) {
                    for (let j = 0; j < files.length; j++) {
                        let fileTest = (files[j].name === file.name && files[j].size === file.size);
                        if (fileTest) {
                        let test = findFile(jdatas, files[j]);
                        let indexName = getFileName(files[j]);
                        if (test) {
                            jdatas.splice(jdatas.indexOf(test), 1);
                        }
                            if( _.contains(dz.files,files[j]) && fileTest){
                                this.dropzone.removeFile(files[j]);
                            }
                        }
                    }

                          this.setState({
                           files: files
                          });
                }
            }
            
            if(files.length === 0) {
                jdatas = [];
                if (dz.files.length > 0) {
                dz.removeAllFiles();
                }
                this.setState({
                    jdatas: jdatas
                });
            }
        };
        /*        this.sending = (file) => {
                    console.log(file);
                    fileUpload(file);

                };*/
        this.onClickSave = this.onClickSave.bind(this);
    }
    onClickSave() {
        //  console.log(this.state.files);
        console.log(this.dropzone);
        console.log(this.state.files);
        //   fileUpload(file);
        this.dropzone.processQueue();
    }
    saveBillingJSON(tableData) {
        let tableDataClone = __.cloneDeep(tableData); 
        _.each(tableDataClone, (jdata) => {
            for (let key in jdata) {
            if(key !== undefined || key !== null || key !== '' )  {
                if(jdata[key].includes('$') && key.toLowerCase() !== 'feeschedule' ){
                let cleaner =  numeral().unformat(jdata[key]);
                jdata[camelize(key)] = cleaner;
                }
                else {
                     jdata[camelize(key)] = jdata[key];
                }       
            } 
            if(camelize(key) !== key)
                delete jdata[key];
            }
            insertBilling.call(jdata, (err, res) => {
                if(err) {
                    console.log(err);
                    Bert.alert('Error Processing Billing','danger');
                }
                else {
                    Bert.alert('Successfully Uploaded Billing','success');
                }
            });
        });
    }
    displayJtable(jdata) {
        let jGriddle;
        for (let key in jdata) {
            if (jdata.hasOwnProperty(key)) {   
                        jGriddle = (
                                   <div key = { Math.random() }>
                                   <div key = { key + Math.random() } className="table-responsive"> 
                                   <Griddle 
                                         results={jdata[key]}
                                           resultsPerPage={50} 
                                           useFixedLayout={false}
                                           sortAscendingComponent={<span className="fa fa-sort-alpha-asc"></span>}
                                           sortDescendingComponent={<span className="fa fa-sort-alpha-desc"></span>} 
                                           tableClassName="table table-striped table-bordered table-condensed table-hover" 
                                           showFilter={true}
                                           showSettings={true} 
                                           settingsIconComponent={<span className="fa fa-cogs pull-left"></span>}
                                           previousIconComponent={<span className="fa fa-long-arrow-left"></span>}
                                           nextIconComponent={<span className="fa fa-long-arrow-right"></span>}
                                           /><br />
                                    </div>
                                    <Button  type="submit" onClick={ () => this.saveBillingJSON(jdata[key]) } bsStyle="info">Save Table Data</Button>
                                    <br />
                                    </div>);
                    } else { 
                        jGriddle = (<Alert bsStyle="warning">Data cannot be displayed.</Alert>);
                    }
                }
        return jGriddle;
    }


    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        const griddles = this.state.jdatas;
        const displayGriddles = () => ( griddles.length > 0 ? (griddles.map(table => (
                       this.displayJtable(table)))) : <Alert bsStyle="info">Add a file to view data.</Alert>);  

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.addedFile,
            sending: this.sending,
            complete: this.complete,
            removedfile: this.removedFile,

        };

        return (
                   <Grid>
                   <Row>
                   <Col lg={12}>
                  <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} className={'dropzone-area'} />
                  </Col>
                  </Row>
                  <Row>
                   <Col lg={1} className="panel-body">
                   <Button type="submit" onClick= { this.onClickSave } bsStyle="primary">Upload!</Button>
                   </Col>
                   </Row>
                   <Row>
                   <Col lg={12}>
                   { 
                       displayGriddles()
                    }
                   </Col>
                   </Row>
                   </Grid>
        );

    }
}