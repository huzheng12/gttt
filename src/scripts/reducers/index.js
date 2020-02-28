



import { combineReducers } from 'redux'

import { count } from './data'//数据来源
import { datum } from './datum'//数据来源
import { tction } from './tction';
import { bbdata } from './bbdata';


export const reducers = combineReducers({
    data: count,
    datum: datum,
    tction: tction,
    bbdata: bbdata,
});
