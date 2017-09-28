import {Mongo} from 'meteor/mongo';
 
export const Households = new Mongo.Collection('households');

Households.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Households.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

/*{
    "_id" : "2323961",
    "accountIds" : [ 
        "5974161", 
        "z0212776641", 
        "z0212860431", 
        "z0212860441"
    ]
}*/