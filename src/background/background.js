import {commonConfig} from '../common/common';
import {browserExtensionPlatform} from './../env';

console.log('Hi, this is background page.');
console.log('I can access my common config:' + JSON.stringify(commonConfig));
console.log('But also my platform-specific variables:' + JSON.stringify(browserExtensionPlatform));