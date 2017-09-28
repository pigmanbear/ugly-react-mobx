'use strict'
import {
    HTTP
} from 'meteor/http';
import {
    Meteor
} from 'meteor/meteor';
import {
    Services
} from '../services/services';
import {
    ApiCall
} from './apicall';
import {
    bd_service
} from '../services/methods';


import moment from 'moment';
import fs from 'fs';
import zip from 'adm-zip';

const token_url = 'https://api.bdreporting.com/issue/oauth2/token';
const base_url = 'https://api.bdreporting.com';

let result = getBDAuth();

/*
console.log(p);

p
    .then((r) => {
        result = r;
    })
    .catch((error) => {
        console.log(error);
    });*/

const gt = result.grant_type[0];
const gt2 = result.grant_type[1];
const cid = result.client_id;
const cs = result.client_secret;
const username = result.username;
const password = result.password;



//Legacy
/*let bd_settings = {
    '_id': 'blackdiamond',
    'grant_type': [gt, gt2],
    'client_id': cid,
    'client_secret': cs,
    'username': username,
    'password': password
}*/


let tokenHeaders = {
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache'
};

let tokenForm = {
    grant_type: gt,
    client_id: cid,
    client_secret: cs,
    username: username,
    password: password
};

export const getToken = () => {
    if (!getBDRefreshToken()) {
        retrieveNewToken();
    } else {
        let refreshTokenForm = {
            grant_type: gt2,
            client_id: cid,
            client_secret: cs,
            refresh_token: getBDRefreshToken()
        };

        let npmRefreshTokenRequestOptions = {
            headers: tokenHeaders,
            form: refreshTokenForm,
            json: true

        };

        try {
            console.log('Getting Token from Refresh token: ' + token_url);
            let result = HTTP.call('POST', token_url, {
                npmRequestOptions: npmRefreshTokenRequestOptions
            }, (err, res) => {
                if (err) {
                    console.log('Failure to get token: ' + err);
                }
                switch (res.statusCode) {
                    case 401:
                        {
                            console.log('Authorization Error: ' + res.statusCode);
                            console.log('Error in configuration.');
                            console.log(res);
                            break;
                        }
                    case 200:
                        {
                            result = res;
                            console.log('Success Retrieving New Token.');
                            updateBDServicesToken(result);
                            return result.content.access_token;
                        }
                    default:
                        {
                            console.log('SatusCode received: ' + res.statusCode);
                            console.log('Check Status Code to resolve errors. Will not retry for Token.');
                            console.log(res);
                            break;
                        }
                }
            });
        } catch (e) {
            retrieveNewToken();
        }
    }
};

let test = true;
export const getApiData = (endpoint, callback) => {
    console.log('Getting API Data . . .');
    let error;
    let result;
    let queryHeaders = {
        'cache-control': 'no-cache',
        authorization: 'Bearer ' + getBDToken()
    };

    let npmQueryRequestOptions = {
        headers: queryHeaders,
        form: tokenForm,
        json: true
    };
    try {
        let result = HTTP.call('GET', base_url + '/v1/' + endpoint, {
            npmRequestOptions: npmQueryRequestOptions
        }, (err, res) => {
            if (err) {
                console.log('Failure to get endpoint: ' + err);
            }
            switch (res.statusCode) {
                case 401:
                    {
                        console.log('Authorization Error: ' + res.statusCode);
                        console.log('Getting new token . . .');
                        getToken();
                        console.log('Trying again . . .');
                        Meteor.setTimeout(() => {
                            getApiData(endpoint, callback);
                        }, 2000);
                        break;
                    }
                case 200:
                    {
                        result = res;
                        console.log(res.statusCode + ': Success with API endpoint: ' + endpoint);
                        Meteor.setTimeout(() => {
                            callback(error, result);
                        }, 500);
                        break;
                    }
                default:
                    {
                        console.log('StatusCode received : ' + res.statusCode);
                        console.log('Check Status Code to resolve errors. Will not retry for endpoint.');
                        break;
                    }
            }

        });
    } catch (e) {
        console.log('Failure: ');
        console.log(e);
        console.log(e.response.statusCode);
        callback(error, result);
    }
};

export const getBatchId = (callback) => {
    console.log('Getting Batch ID . . .');
    let error;
    let result;
    const yesterday = () => {
        let day = moment().add(-1, 'd');
        switch (day.weekday()) {
            case 0:
                return moment().add(-3, 'd');
            case 6:
                return moment().add(-2, 'd');
            default: return day;
        }
    };
    console.log(yesterday().toDate());
    let batchForm = tokenForm;
    batchForm.returnDate = yesterday().format('MM/DD/YYYY');
    ///DO we want closed accounts? Probably not all the time. Possibly convert the calls to callable from the client
    //and make this parameter configurable
    batchForm.includeClosedAccounts = false;

    let batchHeaders = {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'authorization': 'Bearer ' + getBDToken()
    };

    let npmBatchRequestOptions = {
        headers: batchHeaders,
        form: batchForm,
        json: true

    };

    try {
        result = HTTP.call('POST', base_url + '/v2/batch', {
                npmRequestOptions: npmBatchRequestOptions
            },
            (err, res) => {
                if (err) {
                    console.log('Failure to get batch: ');
                    console.log(err);
                }
                console.log('In batchID: ', res.statusCode);
                switch (res.statusCode) {
                    case 401:
                        {
                            console.log('Token expired, so we will get a new one');
                            getToken();
                            console.log("Trying again with new token, id not updated ");
                            Meteor.setTimeout(() => {
                                getBatchId(callback);
                            }, 2000);
                            break;
                        }
                    case 200:
                        {
                            result = res;
                            ApiCall.upsert({
                                    _id: 'blackDiamondBatch'
                                }, {
                                    $set: {
                                        batch_id: result.content.id,
                                        lastUpdate: moment(),
                                        lastRequest: moment().valueOf(),
                                        lastCall: moment().format('MM/DD/YYYY'),
                                        name: 'batch_portfolios_accounts',
                                        type: 'batch'
                                    }
                                },
                                (error, num) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log(num);
                                    }
                                });
                            Meteor.setTimeout(() => {
                                callback(error, result);
                            }, 500);
                            break;
                        }
                    default:
                        {
                            console.log('SatusCode received: ' + res.statusCode);
                            console.log('Check Status Code to resolve errors. Will not retry for Batch ID.');
                            break;
                        }
                }
            });
    } catch (e) {
        console.log('Failure: ');
        console.log(e);
        error = e;
        Meteor.setTimeout(() => {
            callback(error, result);
        }, 2000);
    }
    /*    else {
            console.log(moment().format('dddd'), ' is not a valid batch retrieval day');
            console.log('Will wait to retrieve batch on a weekday');
        }*/

};

export const getBatchZip = (callback) => {
    console.log('Getting zip file from batch . . .');
    let batchHeaders = {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'authorization': 'Bearer ' + getBDToken()
    };

    let yesterday = moment().add(-1, 'd');

    let npmBatchRequestOptions = {
        headers: batchHeaders,
        form: tokenForm,
        json: true,
        encoding: null

    };

    let call = ApiCall.findOne('blackDiamondBatch');
    let result;
    let error;
    try {
        result = HTTP.call('GET', base_url + '/v2/batch/' + call.batch_id, {
                npmRequestOptions: npmBatchRequestOptions
            },
            (err, res) => {
                console.log(res.statusCode);
                switch (res.statusCode) {
                    case 401:
                        {
                            console.log(res.statusCode, 'Token expired. Trying again');
                            getToken();
                            Meteor.setTimeout(() => {
                                getBatchZip(callback);
                            }, 4000);
                            break;
                        }
                    case 202:
                        {
                            console.log(res.statusCode + ": Batch not ready. Trying again in 15 minutes: ");
                            if (moment().add(8, 'minutes').isAfter(getBDExpiresIn())) {
                                getToken();
                            }
                            Meteor.setTimeout(() => {
                                getBatchZip(callback);
                            }, 940000);
                            break;
                        }
                    case 200:
                        {
                            let file = '/tmp/batch_call_' + call.batch_id + '.zip';
                            console.log('Writing file: ' + file);
                            fs.writeFile(file, res.content, 'binary',
                                Meteor.bindEnvironment((er) => {
                                    if (er) {
                                        console.log(er);
                                        console.log('File did not save.');
                                    } else {
                                        console.log('File saved: ' + file);
                                        Meteor.setTimeout(() => {
                                            callback(error, result);
                                        }, 500);
                                    }
                                }));

                            break;
                        }
                    default:
                        {
                            console.log('SatusCode received: ' + res.statusCode);
                            console.log('Check code to resolve errors. Will not retry');
                            console.log(res);
                            break;
                        }
                }
            });
    } catch (e) {
        console.log('Failure: ');
        console.log(e);
        console.log(e.response.statusCode);
        error = e;
    }
};



//Legacy - Using Service.configuration at Startup
/*function bd_service(): void {

    Services.upsert({
            _id: bd_settings._id
        }, {
            $setOnInsert: {
                _id: bd_settings._id,

            },
            $set: {
                grant_type: bd_settings.grant_type,
                client_id: bd_settings.client_id,
                client_secret: bd_settings.client_secret,
                username: bd_settings.username,
                password: bd_settings.password
            }
        },
        (error, docCount) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Documents affected: ' + docCount);
                console.log('Services setup completed.');
            }
        });
}*/

function retrieveNewToken() {
    try {
        console.log('Refresh Token Expired:  ' + moment(getBDAuth().expires_in).toDate());

        let npmTokenRequestOptions = {
            headers: tokenHeaders,
            form: tokenForm,
            json: true

        };
        let result = HTTP.call('POST', token_url, {
            npmRequestOptions: npmTokenRequestOptions
        }, (err, res) => {
            if (err) {
                console.log('Failure to get token: ' + err);
            }
            switch (res.statusCode) {
                case 401:
                    {
                        console.log('Authorization Error: ' + res.statusCode);
                        console.log('Error in configuration.');
                        console.log(res);
                        break;
                    }
                case 200:
                    {
                        result = res;
                        console.log('Success Retrieving New Token.');
                        updateBDServicesToken(result);
                        return result.content.access_token;
                    }
                default:
                    {
                        console.log('SatusCode received: ' + res.statusCode);
                        console.log('Check Status Code to resolve errors. Will not retry for Token.');
                        console.log(res);
                        break;
                    }
            }
        });
    } catch (e) {
        console.log('Fatal error attempting to retrieve token.');
        console.log(e);
        return;
    }
}

function getBDAuth() {
    if (!Services.findOne('blackdiamond')) {
        bd_service();
        Meteor.setTimeout(() => {
        return Services.findOne('blackdiamond');
        },1000);
    } else
        return Services.findOne('blackdiamond');
}

function getBDToken() {
    return Services.findOne('blackdiamond').token;
}

function getBDRefreshToken() {
    return Services.findOne('blackdiamond').refresh_token;
}

function getBDExpiresIn() {
    return Services.findOne('blackdiamond').expires_in;
}

function updateBDServicesToken(result) {
    Services.update({
        _id: 'blackdiamond'
    }, {
        $set: {
            refresh_token: result.content.refresh_token,
            token: result.content.access_token,
            expires_in: moment().add(result.content.expires_in - 10, 'seconds').valueOf()
        }
    });
}