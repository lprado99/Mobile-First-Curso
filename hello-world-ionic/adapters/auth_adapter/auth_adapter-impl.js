
function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	WL.Logger.warn("Entre onAuthRequired");
	return {
		authStatus: "credentialsRequired",
		errorMessage: errorMessage
	};
}

function submitAuthentication(user, pass){
	var path="Cellphones/Login?user="+user+"&pass="+pass;
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path
	};
	var result =  WL.Server.invokeHttp(input).result;
	WL.Logger.warn("obtuve result = "+result);
	if(result=="pass"){
		var userIdentity = {
				userId: user,
				displayName: user, 
				attributes: {
					foo: "bar"
				}
		};
		WL.Server.setActiveUser("AuthRealm", userIdentity);
		return { 
			authStatus: "complete" 
		};
	}
	return onAuthRequired(null, "Invalid login credentials");
}

function onLogout(){
	WL.Logger.debug("Logged out");
}



