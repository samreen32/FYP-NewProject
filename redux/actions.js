export const GET_CITIES = 'GET_CITIES';         //from API

const API_URL = 'AIzaSyBR5mzbKQACc1PwplhuA0ewF10WFCPwYmc'; //generating fake api from website "Fake API".

//method to fetch api data
export const getCities =()=> {
    try{
        return async dispatch =>{     //creating object in dispatch.
            const result = await fetch(API_URL, {
                method: "GET",      
                headers: {
                    'Content-Type': 'application/json'
                },
                //if method: "POST" then respose send as:
                // body: JSON.stringify({          
                //     firstParam: 'yourValue',
                //     secondParam: 'yourOtherValue'
                // })
            });
            const json = await result.json();
            if(json){
                dispatch({
                    type: GET_CITIES,
                    payload: json
                });
            }else{
                console.log("Unable to fetch API!");
            }
        }    
    }catch(error){
        console.log(error);
    }
}
