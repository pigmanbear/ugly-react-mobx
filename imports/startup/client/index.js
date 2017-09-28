import { Bert } from 'meteor/themeteorchef:bert';
import './routes.js';
import './constant';
import '../../autoruns/billingLatest';
import '../../autoruns/portfolioTotals';
import '../../autoruns/portfoliosbilling';

Bert.defaults.style = 'growl-top-right';
