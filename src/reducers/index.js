import {combineReducers} from 'redux'
import reducer from './auth';
import pdfreducer from './pdfreducer';
import summaryreducer from './summaryreducer';
import pdflinkreducer from './pdflinkreducer'
import mcqreducer from './mcqreducer';

export default combineReducers({
    pdf:pdfreducer,
    summary:summaryreducer,
    file:pdflinkreducer,
    mcq:mcqreducer,
    auth:reducer
})