import JSZIP from 'jszip';
import XLSX from 'xlsx';
import {
    Meteor,
} from 'meteor/meteor';


var X = XLSX;

var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    rABS: () => {
        postMessage({
            t: "ready"
        });
        onmessage = (oEvent) => {
            var v;
            console.log(oEvent);
            try {
                v = XLSX.read(oEvent.data.d, {
                    type: oEvent.data.b ? 'binary' : 'base64'
                });
            } catch (e) {
                postMessage({
                    t: "e",
                    d: e.stack || e
                });
            }
            postMessage({
                t: "xlsx",
                d: JSON.stringify(v)
            });
        };
    },
    norABS: () => {
        postMessage({
            t: "ready"
        });

        function ab2str(data) {
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        }

        function s2ab(s) {
            var b = new ArrayBuffer(s.length * 2),
                v = new Uint16Array(b);
            for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
            return [v, b];
        }

        onmessage = function(oEvent) {
            var v;
            try {
                v = XLSX.read(ab2str(oEvent.data), {
                    type: 'binary'
                });
            } catch (e) {
                postMessage({
                    t: "e",
                    d: e.stack
                });
            }
            var res = {
                t: "xlsx",
                d: JSON.stringify(v)
            };
            var r = s2ab(res.d)[1];
            postMessage(r, [r]);
        };
    },
    noxfer: () => {
        postMessage({
            t: "ready"
        });
        onmessage = (oEvent) => {
            var v;
            try {
                v = XLSX.read(oEvent.data.d, {
                    type: oEvent.data.b ? 'binary' : 'base64'
                });
            } catch (e) {
                postMessage({
                    t: "e",
                    d: e.stack || e
                });
            }
            postMessage({
                t: "xlsx",
                d: JSON.stringify(v)
            });
        };
    }
};
let rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

let use_worker = typeof Worker !== 'undefined';
let transferable = false;


var wtf_mode = false;

const fixdata = (data) => {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
};

const ab2str = (data) => {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
    return o;
};

const s2ab = (s) => {
    var b = new ArrayBuffer(s.length * 2),
        v = new Uint16Array(b);
    for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
};

const xw_noxfer = (data, cb) => {
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function(e) {
        switch (e.data.t) {
            case 'ready':
                break;
            case 'e':
                console.error(e.data.d);
                return '';
            case XW.msg:
                return cb(JSON.parse(e.data.d));

        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({
        d: arr,
        b: rABS
    });
};

const xw_xfer = (data, cb) => {
    var worker = new Worker(rABS ? XW.rABS : XW.norABS);
    worker.onmessage = function(e) {
        switch (e.data.t) {
            case 'ready':
                break;
            case 'e':
                console.error(e.data.d);
                return '';
            default:
                xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                console.log("done");
                return cb(JSON.parse(xx));
        }
    };
    if (rABS) {
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
    } else {}
};

const xw = (data, cb) => {
    if (transferable)
        return xw_xfer(data, cb);
    else
        return xw_noxfer(data, cb);
};

const to_json = (workbook) => {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
};

const process_wb = (wb) => {
    var output;
    //output = JSON.stringify(to_json(wb), 2, 2);
    k = to_json(wb);
    console.log(k);
    if (typeof console !== 'undefined') console.log("output", new Date());
    //console.log(output);
    return k;
};

export const processExcel = (file) => {
    return new Promise((resolve, reject) => {

        let f = file;
        var reader = new FileReader();
        let g;
        if (rABS) reader.readAsBinaryString(f);
        else
            reader.readAsArrayBuffer(f);
        reader.onload = function(e) {
            if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            var wb;
            if (rABS) {
                wb = X.read(data, {
                    type: 'binary'
                });
            } else {
                var arr = fixdata(data);
                wb = X.read(btoa(arr), {
                    type: 'base64'
                });
            }
            g = process_wb(wb);
            if (g)
                resolve(g);
            else
                reject(g);
        };

    });
};