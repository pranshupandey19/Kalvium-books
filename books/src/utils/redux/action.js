
import { FETCH_DATA, FORM_DATA, SAVED_DATA, SEARCH } from "./actionType";


export const fetchUserdata = (data)=>{
    return {
        type : FETCH_DATA,
        payload : data
    }
}

export const searchData = (search)=>{
  return{
    type : SEARCH,
    payload : search
  }
}

export const formData = (form)=>{
  return{
    type : FORM_DATA,
    payload : form
  }
}

export const updateSavedData = (local)=>{
  return{
    type : SAVED_DATA,
    payload : local
  }
}