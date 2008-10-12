//alert("ajax.js");
////////////////////////////////////////////////////////////
/////  Ajax ����
////////////////////////////////////////////////////////////
/*
* XmlHttp ��
*/
var XmlHttp = function() {
	var o = null;
	
	var readyStateChange = function(processResponseProc) {
		if (o.readyState == 4) {
			//if (o.status == 200 || o.status == 0) {
			// ʹ����Զ������.������
			if (o.status) {
				processResponseProc(o.responseText, o.getAllResponseHeaders());
			} /*else if (o.status == 302 || o.status == 301 || o.status == 304) { 
				processResponseProc(null, o.getAllResponseHeaders());
			} else {
				processResponseProc(null, null);
			}*/
		}
	};

	var setRequestHeaders = function(headers) {
		var header, name, value;

		if (headers == null || headers == undefined) {
			return;
		}

		for (var i = 0; i < headers.length; i ++) {
			header = headers[i];
			if (header.indexOf(":") < 0) {
				continue;
			}
			name = header.split(":")[0];
			value = header.substring(header.indexOf(":") + 1);
			o.setRequestHeader(name, value);
		}
	}

	return {
		/*
		* init ����
		*
		* ����ֵ
		* �����ʼ���ɹ��򷵻�true�����򷵻�false
		*
		* ˵��
		* ��ʼ��XmlHttp����
		*/
		init : function() {
			if (o == null) {
				if (window.XMLHttpRequest) {
					try {
						o = new XMLHttpRequest();
					} catch (ex) {
						return false;
					}
				} else if (window.ActiveXObject) {
					try {
						o = new ActiveXObject("Msxml4.XMLHttp");
					} catch (ex) {
						try {
							o = new ActiveXObject("Msxml2.XMLHttp");
						} catch (ex) {
							try {
								o = new ActiveXObject("Microsoft.XMLHttp");
							} catch (ex) {
								return false;
							}
						}
					}
				}
			}

			return true;
		},

		/*
		* get ����
		*
		* ����
		* url - Ҫ�����url
		* processResponse - �������ؽ��ί��
		*
		* ����ֵ
		* ���������ɹ��򷵻�true,���򷵻�false
		*
		* ˵��
		* ����http����
		*/
		get : function(url, headers, processResponse) {
			try {
				o.open("GET", url, true);
				setRequestHeaders(headers);
				o.onreadystatechange = function() { readyStateChange(processResponse); };
				o.send();
				return true;
			} catch (ex) {
				return false;
			}
		},

		/*
		* post ����
		*
		* ����
		* url - Ҫ�����url
		* data - ���͵����ݣ�ע������ֵ������urlencode����
		* processResponse - �������ؽ��ί��
		*
		* ����ֵ
		* ���������ɹ��򷵻�true,���򷵻�false
		*
		* ˵��
		* ����post����
		*/
		post : function(url, data, headers, processResponse) {
			processResponseProc = processResponse;
			try {
				o.open("POST", url, true);
				setRequestHeaders(headers);
				o.onreadystatechange = function() { readyStateChange(processResponse); };
				o.setRequestHeader("Content-Length", data.length);
				o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				o.send(data);
				return true;
			} catch (ex) {
				return false;
			}
		}
	};
};

/*  ʹ�÷���
var xmlhttp = new XmlHttp();
if (xmlhttp.init()) {
	var url = "http://cn.yahoo.com";

	xmlhttp.post(url, "", null, function(response, responseHeaders) {
		if (responseHeaders != null) {
			alert(responseHeaders);
		}

		if (response != null) {
			alert(response);
		}
	});
}
*/

// ��ʼ��
var xmlhttp = new XmlHttp();

///////////////////////////////////////////////
//// ��װPOST/GET
///////////////////////////////////////////////
function ajaxpost(url, param){ 
  // �ڶ����������ύ�Ĳ���,������������headers
	xmlhttp.post(url, param, null, function(response, responseHeaders) {
		 if (responseHeaders != null) {
			 alert(responseHeaders);
		 }
    
		 if (response != null) {
			 alert(response);
		 }		    
	 });
}
 
function ajaxget(url){
  // �ڶ���������headers
	xmlhttp.get(url, null, function(response, responseHeaders) {
		if (responseHeaders != null) {
			alert(responseHeaders);
		}
    
		if (response != null) {
			alert(response);
		}
	});
} 