export function setAuth(tokentype, token) {
    // Set the session authentication here based on the token
    sessionStorage.setItem(tokentype, token);
}

export function setWebsiteId(tokentype, token) {
    // Set the session authentication here based on the token
    sessionStorage.setItem(tokentype, token);
}


export function getAuth(tokentype) {
    if (sessionStorage[tokentype]) {
        return true;
    }
    return false;
}


export function getAuthToken(tokentype) {
    if (sessionStorage[tokentype]) {
        return sessionStorage[tokentype];
    }
    return false;
}

export function getWebsiteId(tokentype) {
    if (sessionStorage[tokentype]) {
        return sessionStorage[tokentype];
    }
    return false;
}


export function addUser(username) {

}