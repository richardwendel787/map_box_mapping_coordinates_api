//to get the magnitude and place value from json within javascript I would use:


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then((json_data)=>{

	var events=[]
	//the property 'fearues' is an array, with each element correseponding to an earthquake event
	//to get the magnitude and place of the earthquake we must iterate through each event in the array
	//so that we can extract the 'mag' and 'place' values from within the 'properties' dictionary object
	var features=json_data.features;
	features.forEach(function (earthquake){
		var properties=earthquake.properties;
		var magnitude=properties.mag;
		var place = properties.place;

		var geometry = earthquake.geometry;
		var coordinates = geometry.coordinates;
		var lat = coordinates[0];
		var long = coordinates[1];

		//now we have isolated every value we want related to the earthquake event, lets store it so we can use it later

		var e={
			mag:magnitude,
			place:place,
			y:lat,
			x:long
		}
		events.push(e); 		//this event can later be accessed from within the "events" variable
	})
	//we need to have a div section with an id, in this case i am assuming the div id is 'mymap'... ie, <div id="mymap">...</div>
	//https://leafletjs.com/reference-1.6.0.html#map-factory
	var map = L.map('map',{
		center: [-50.00, -100.00],
		zoom: 2,
		zoomControl: true
	})
	///https://docs.mapbox.com/api/maps/#static-tiles : GET /styles/v1/{username}/{style_id}/tiles/{tilesize}/{z}/{x}/{y}{@2x}
//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: 0,
    accessToken: 'pk.eyJ1IjoicmljaGFyZHdlbmRlbDc4NyIsImEiOiJjazljM2R0Z3gwMHZ5M29zeWxrMm9kdncyIn0.WhCsWtebrlypxu-jOTS9GQ'
}).addTo(map);
	events.forEach((event)=>{
		//do something with the event information, such as create a marker and add it to the map..
		//L.marker(<LatLng> latlng, {<Marker options> options?})
		L.marker([event.x,event.y],{
			title:event.place+"\n("+event.x.toString()+", "+event.y.toString()+")"
		}).addTo(map);	
	})

})