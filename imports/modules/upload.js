// So we can create dropzones programmatically
import Dropzone from 'dropzone';
import {
    upload,
    processBillingsUpload
} from '../api/billings/methods';
import {
    Bert
} from 'meteor/themeteorchef:bert';
import {
    processExcel
} from '../modules/xlsx/process';
import {
    Meteor
} from 'meteor/meteor';

Dropzone.autoDiscover = false;


const fileUpload = (file) => {
    upload(file)
        .then((result) => {
            Bert.alert('Upload success', 'success');
            console.log(result);
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
                if (r == 'success')
                    Bert.alert('File successfully processed!', 'success');
                else
                    Bert.alert('There was an error processing file', 'warning');
            }
        });
    }, 500);
};

export const dropzoneUpload = () => {

    // Dropzone settings
    Dropzone.options.dropzoneArea = {
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 100,
        dictDefaultMessage: '<em class="fa fa-upload fa-3x"></em> Drop files here to upload', // default messages before first drop
        paramName: 'file', // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        addRemoveLinks: true,
        accept: function(file, done) {
            let thumbnail = $('.dropzone .dz-preview.dz-file-preview .dz-image:last');

            switch (file.type) {
                case 'application/xls':
                    thumbnail.css('background', 'fa fa-file-excel-o fa-3x text-success');
                    break;
                case 'application/xlsx':
                    thumbnail.css('background', 'fa fa-file-excel-o fa-3x text-success');
                    break;
                case 'application/csv':
                    thumbnail.css('background', 'fa fa-file-excel-o fa-3x text-success');
                    break;
            }
            done();
        },
        init: function() {
            var dzHandler = this;

            this.element.querySelector('button[type=submit]').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dzHandler.processQueue();
            });
            this.on('addedfile', function(file) {

            });
            this.on('sending', function(file) {
                console.log(file);
                fileUpload(file);
            });
            this.on('removedfile', function(file) {
                console.log('Removed file: ' + file.name);
            });
            this.on('sendingmultiple', function() {

            });
            this.on('successmultiple', function( /*files, response*/ ) {

            });
            this.on('errormultiple', function( /*files, response*/ ) {
                Bert.alert('Something went wrong! File not successfully Uploaded', 'danger');
            });

            this.on('complete', function(file) {
                this.removeFile(file);
            });
        }

    };

    $("#dropzone-area").dropzone({
        url: '/upload'
    });

};