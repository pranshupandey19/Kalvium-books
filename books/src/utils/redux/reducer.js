const initialState={
  books:[],
  search:"",
  formData:{},
  savedData: JSON.parse(localStorage.getItem("data"))
}
export default function Reducer (state=initialState,action){
  switch(action.type){
      case "FETCH_DATA":
          return{
              ...state,
              books:action.payload
          }

      case "SEARCH":
        return{
          ...state,
          search:action.payload
          
        }

        case "FORM_DATA":
          return{
            ...state,
            formData:action.payload
            
          }

          case 'SAVED_DATA':
            return {
              ...state,
              savedData: action.payload,
            };
      default:
          return state;
  } 
  
}











