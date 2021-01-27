import jwt_decode from "jwt-decode";

function decodeJWt() {
    
    try {
        let token = localStorage.getItem('_jid');
        if(token === undefined) {
            return undefined;
        }else {
            return jwt_decode(token);
        }
    } catch (error) { 
        return undefined;
    }
}

export{
    decodeJWt
} ;