import {
    Mongo
} from 'meteor/mongo';
import {
    SimpleSchema
} from 'meteor/aldeed:simple-schema';

export const Transactions = new Mongo.Collection('transactions');
export const TransactionsNotes = new Mongo.Collection('transactionsnotes');

TransactionsNotes.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

TransactionsNotes.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});
Transactions.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Transactions.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

/*const TransactionsSchema = new SimpleSchema({
    _id : {
        type: String,
    },
  HoldingID : {
            type: String,
        },
        AccountId : {
            type: String,
        },
  MarketValue : {
            type: Number,
        },
        AccountNumber : {
            type: String,
        },
        Ticker : {
            type: String,
        },
        Cusip : {
            type: String,
        },
        AlternateId : {
            type: String,
            optional: true,
        },
        DisplayCusip : {
            type: String,
            optional: true,
        },
        TransactionFee : 0,
        SubCode : {
            type: String,
        },
        TransCode : {
            type: String,
        },
        Description : CLIENT REQUESTED ELECTRONIC FUNDING DISBURSEMENT (FUNDS NOW) TRACKING # 9159325306414548243834 FOR 4200ACH OUT - 08/15/2016 06:16PM,
        FileCodeDescription : Cash Withdrawal,
        Units : 0,
        ReturnDate : {
            type: Date,
        },
        SettleDate : {
            type: Date,
        },
        TradeDate : {
            type: Date,
        },
        TransactionType : {
            type: String,
        },
        TransactionSubType : {
            type: String,
        },
        Notes : {
            type: String,
            optional: true,
        },
        Action : {
            type: String,
        },
        ExternalFlowAffect : {
            type: String,
        },
    }
}
})*/