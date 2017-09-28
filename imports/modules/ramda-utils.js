import R from 'ramda';
import state from '../stores/mobxstores';


export const isObject = R.is(Object, R.__);
export const isNumber = R.is(Number, R.__);
export const pluckKeyValues = (selector, collection) => R.pluck(selector)(collection);
export const filterValues = R.filter(R.__, R.__);
export const notUndefined = n => R.not(R.isNil(n));
export const isNotEmpty = x => R.not(R.isEmpty(x));
export const isEqualProps = (prop, object1) => R.eqProps(prop, object1);
export const isNotEqualProps = (prop, object1) => R.complement(R.eqProps(prop, object1));
export const hasId = R.has('Id');
export const sortByPropCaseInsensitive = p => R.sortBy(R.compose(R.toLower, R.prop(p)));