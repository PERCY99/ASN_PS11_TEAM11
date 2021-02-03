import notes from '../../apis/api';
import axios from 'axios';
export const fetchpdf=(id)=>async dispatch=>{
    const pdf=await notes.get(`pdfs?subcategory=${id}`);
    dispatch({type:'FETCHPDF',payload:pdf.data});
};
export const fetchsummary=(id)=>async dispatch=>{
    const summary =await notes.get(`summaries?subcategory=${id}`);
    dispatch({type:'FETCHSUMMARY',payload:summary.data});
};
export const fetchmcqs=(id)=>async dispatch=>{
    const mcq =await notes.get(`mcqs?subcategory=${id}`);
    dispatch({type:'FETCHMCQ',payload:mcq.data});
};
export const fetchzeroprice=(id)=>async dispatch=>{
    const link=await axios.get(`http://127.0.0.1:8000//api/core/summaries/${id}`);
    dispatch({type:'FETCHZEROPRICE',payload:link.data.file})
}