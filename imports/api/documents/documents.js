
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Portfolios, PortfoliosNotes } from '../portfolios/portfolios';
import { Accounts } from '../accounts/accounts';

export const Documents = Portfolios;
export const DocumentsNotes = PortfoliosNotes;
Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
DocumentsNotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

DocumentsNotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
/*Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  _id: {
    type: String,
    label: 'The Id of the Portfolio.',
  }
});

Documents.attachSchema(Documents.schema);*/

//Factory.define('document', Documents, {
//  title: () => faker.hacker.phrase(),
//});
// Documents.helpers({
//   // A list is considered to be private if it has a userId set
// //   isPrivate() {
// //     return !!this.userId;
// // //   },
// //   editableBy(userId) {
// //     if (!this.userId) {
// //       return true;
// //     }

// //     return this.userId === userId;
// //   },
//   Accounts() {
//     return Accounts.find({ _id: { $in : this.portfolio.AccountIds }});
//   },
// });
/*{
    "_id" : "z024125251",
    "apiDetails" : {
        "name" : "YAKABU, JAMES HIROSHI",
        "accounts" : {
            "_href" : "/v1/portfolio/z024125251/account",
            "_type" : "ResourceLink"
        },
        "address" : {
            "_href" : "/v1/portfolio/z024125251/address",
            "_type" : "ResourceLink"
        },
        "advisors" : {
            "_href" : "/v1/portfolio/z024125251/advisor",
            "_type" : "ResourceLink"
        },
        "classAllocation" : {
            "_href" : "/v1/portfolio/z024125251/classallocation",
            "_type" : "ResourceLink"
        },
        "costBasis" : {
            "_href" : "/v1/portfolio/z024125251/costBasis",
            "_type" : "ResourceLink"
        },
        "details" : {
            "_href" : "/v1/portfolio/z024125251/detail",
            "_type" : "ResourceLink"
        },
        "goals" : {
            "_href" : "/v1/portfolio/z024125251/goal",
            "_type" : "ResourceLink"
        },
        "holdings" : {
            "_href" : "/v1/portfolio/z024125251/holding",
            "_type" : "ResourceLink"
        },
        "segmentAllocation" : {
            "_href" : "/v1/portfolio/z024125251/segmentallocation",
            "_type" : "ResourceLink"
        },
        "targets" : {
            "_href" : "/v1/portfolio/z024125251/target",
            "_type" : "ResourceLink"
        },
        "taxLots" : {
            "_href" : "/v1/portfolio/z024125251/taxlot",
            "_type" : "ResourceLink"
        },
        "transactions" : {
            "_href" : "/v1/portfolio/z024125251/transaction",
            "_type" : "ResourceLink"
        },
        "_href" : "/v1/portfolio/z024125251",
        "_type" : "Portfolio"
    },
    "portfolio" : {
        "Name" : "YAKABU, JAMES HIROSHI",
        "ClientVisibility" : true,
        "AccountIds" : [ 
            ""
        ],
        "Address" : null,
        "Advisors" : [ 
            {
                "FirstName" : "BRYAN",
                "LastName" : "SULLIVAN",
                "_id" : "z02274571"
            }
        ],
        "Goals" : null,
        "Tags" : [ 
            {
                "Name" : "Consent for electronic delivery ",
                "Value" : null
            }, 
            {
                "Name" : "Consent to share info",
                "Value" : null
            }
        ],
        "Targets" : null
    },
    "userId" : "ymXeJZTBXE34kmKke"
}*/