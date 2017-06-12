function openTab(type,titles){
    //var header = $summer.byId('header');
    //var headerPos = $summer.offset(header);    
    var footer = $summer.byId('footer');
    var footerPos = $summer.offset(footer); 
	
    var width = $summer.winWidth();//==320
    var height = $summer.winHeight()-footerPos.h;//gct:计算frame的高  
   // $('#h-title').html(titles);    
	summer.openFrame({
		name: type,
		url: 'html/'+ type +'.html',
		rect: {
			x: 0,
			y: 0,
			w: width,
			h: height
		},
	});       
}
summerready=function(){
	openTab('message','消息');	
}

$(function(){
	
	/**
	 *刷新token 
	 */
	function refreshToken(){
		var urlStr = "http://10.180.3.119:8080/dms.web/dmsMobile/common/login/refreshToken"
		
		var currentToken = summer.getStorage("currentToken_URL");
		
		if(null != currentToken){
			urlStr = urlStr + "?urlToken="+currentToken;
		}
		
		var cur_sessionId = summer.getStorage("cur_sessionId");
					
		if(null != cur_sessionId){
			urlStr = urlStr + "&JSESSIONID="+cur_sessionId;
		}
		
		var web_headers = summer.getStorage("web_headers");
		var headersJson =  $summer.strToJson(web_headers);
		if(null == headersJson){
			headersJson = {} ;
		}
		/**summer.get(urlStr, {
		}, {
		}, function(data) {
			summer.setStorage("currentToken_URL", data);
		}, function(response) {
		    alert(response.error);
		});**/
		
		$.ajax({
			type: 'get',
			url: urlStr,
			dataType: 'json',
			contentType: "application/json ; charset=utf-8",
			success: function(data) {
				alert(data);
	    		summer.setStorage("currentToken_URL", data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(response.error);
			}
		})
	}
	
	/**
	 * 定时更新urlToken：5分钟执行一次 
	 */
	function refreshTokenInterval(){
		setInterval(refreshToken,5*60*1000);
	}
	refreshToken();
	refreshTokenInterval();
})

 