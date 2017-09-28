import {Mongo} from 'meteor/mongo';
 
export const Services = new Mongo.Collection('services');
export const ServicesNotes = new Mongo.Collection('servicesnotes');


Services.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Services.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});