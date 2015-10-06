(function Map(){
		//Inital Baidu MAP Api

		this.oMap = new Object();

		this.oMap.TYPE = {
			BaiduMap  : 'Baidu',
			GoogleMap : 'Google',
			BingMap  : "Bing"};

	    this.oMap.TRAVEL_MODE = {
			DRIVING: 'DRIVING',
			BICYCLING: 'BICYCLING',
			TRANSIT: 'TRANSIT',
			WALKING: 'WALKING'
	    };

		this.oMap.sApi   = null;
		this.oMap.oBaiduMap = new Object();

		this.oMap._includeMapApi   = 	function (){
				var oHead = document.getElementsByTagName("head")[0];
				var oMapAPI = document.createElement("script");
				oMapAPI.setAttribute('language','javascript');
				oMapAPI.setAttribute('type', "text/javascript");
				oMapAPI.setAttribute('src',this.sApi);
				oMapAPI.setAttribute('id','MapApi');
				oHead.appendChild(oMapAPI);
		};

		this.oMap._removeMapApi = function(){
			var oHead   = document.getElementsByTagName("head")[0];
			var oMapAPI = document.getElementById('MapApi');
			oHead.removeChild(oMapAPI);
		};

		/**
		*    inital MapApi
		**/
		this.oMap._initBaiduMapApi 		= 	function(){
			var sApiKey = "1yk4DALUQxjS72x76ocnSL0a";
			this.sApi = "http://api.map.baidu.com/api?v=2.0&ak=" + sApiKey +'&callback=oMap._createBaiduMap';
			
		};

		/**
		*    inital Map
		**/
		this.oMap.initBaiduMap  		=	function(oAddresses){	
			this.oPoint = oAddresses;
			if(document.getElementById('MapApi')){
				this._removeMapApi();

				//Refire Create Baidu Map
				this._initBaiduMapApi();
				this._includeMapApi();

			}else{
				//Create Baidu Map
				this._initBaiduMapApi();
				this._includeMapApi();
			};

		};

		/**
		*    create Map
		**/
		this.oMap._createBaiduMap	=  	function(){

			//var oCurrentLocation    = new BMap.Point(this.oPoint.CurrentLocation.coords.longitude,this.oPoint.CurrentLocation.coords.latitude);
			var top_left_control    = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
			var top_left_navigation = new BMap.NavigationControl(); 

			this.oBaiduMap = new BMap.Map("map");
			this.oBaiduMap.enableScrollWheelZoom(true); 

			//add Control
			this.oBaiduMap.addControl(top_left_control);        
			this.oBaiduMap.addControl(top_left_navigation);

			var fnGetPointCallBack = function(oTargetPoint){
				if(oTargetPoint){
					this.oMap.RouteInBaiduMap(this.oMap.oPoint.CurrentLocation,oTargetPoint,this.oMap.oBaiduMap)

				}else{
					console.error("地址解析失败");
				}
			};

			var fnGetCurrentPostionCallBack = function (oCurrentPostion){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					oMap.oPoint.CurrentLocation = oCurrentPostion.point;
					oMap._getGeofromBaidu(oMap.oPoint.TargetAddress, fnGetPointCallBack); 
				}else{
					alert('failed to get CurrentlyPostion');
				};
			}	

			this._getCurrentPostion(fnGetCurrentPostionCallBack);
		};

		this.oMap._getCurrentPostion = function(fnCallBack){
			var oGeolocaiton = new BMap.Geolocation();
			oGeolocaiton.getCurrentPosition(fnCallBack,{enableHighAccuracy: true})
		};

		/**
		*   get latitue & Longtitude from Address 
		**/
		this.oMap._getGeofromBaidu   = 	function(sAdress,fnCallBack){
			var oBaduGeo   = new BMap.Geocoder();
			if(!fnCallBack){
				console.error('No callback function for GeoLocation')
			}else{
				oBaduGeo.getPoint(sAdress,fnCallBack);
			};
		};

		/**
		*  Show driving route in BaiduMap
		**/
		this.oMap.RouteInBaiduMap   	= 	function(oCurrentLocation, oDestinaion, oMap){
			var options = {
				renderOptions:{
				map 		 : oMap,
				autoViewport : true
			}};
			var oDrivingRoute = new BMap.DrivingRoute(oMap,options);
			oDrivingRoute.search(oCurrentLocation,oDestinaion);
		};

		/**
		*   destroyBaiduMap
		**/
		this.oMap.destroyBaiduMap = function(){
			delete this.oBaiduMap;
			delete this.api;
		};
}());