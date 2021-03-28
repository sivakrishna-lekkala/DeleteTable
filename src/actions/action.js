export function getUserDetails(data){ 
    if( data != null){
        return {
            type:"GET_USER",
            data:data
        }
    }
}