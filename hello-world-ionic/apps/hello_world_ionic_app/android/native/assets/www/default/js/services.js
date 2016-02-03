
/* JavaScript content from js/services.js in folder common */
/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

app.factory("cellphonesService", function($q) {
	return function(){
		var deferred = $q.defer();
		
		var resourceRequest = new WLResourceRequest("/adapters/cellphones_adapter/getCellphones", WLResourceRequest.GET, 30000);
		resourceRequest.send().then(
			$.proxy(function(data) {
				deferred.resolve(data.responseJSON.items);
			},this),
			
			$.proxy(function(error) {
				deferred.reject(error);
			},this)
		);
		
		return deferred.promise;
	};
});
app.factory("cellphoneService", function($q) {
	return function(id){
		var deferred = $q.defer();
		var resourceRequest = new WLResourceRequest("/adapters/cellphones_adapter/getCellphone", WLResourceRequest.GET);
		var params = "['"+id+"']";
		resourceRequest.setQueryParameter("params", params);
		resourceRequest.send().then(
			$.proxy(function(data) {
				deferred.resolve(data.responseJSON);
			},this),
			
			$.proxy(function(error) {
				deferred.reject(error);
			},this)
		);
		
		return deferred.promise;
	};
});
app.factory("loginService", function($q) {
	return function(user,pass){
		var deferred = $q.defer();
		var resourceRequest = new WLResourceRequest("/adapters/cellphones_adapter/login", WLResourceRequest.GET);
		var params = "['"+user+"','"+pass+"']";
		resourceRequest.setQueryParameter("params", params);
		resourceRequest.send().then(
			$.proxy(function(data) {
				deferred.resolve(data.responseJSON.result);
			},this),
			
			$.proxy(function(error) {
				deferred.reject(error);
			},this)
		);
		
		return deferred.promise;
	};
});