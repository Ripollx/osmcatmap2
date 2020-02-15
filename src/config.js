/**
 * OSM Cat config
 */
import $ from 'jquery'; //https://jquery.com
import TileLayer from 'ol/layer/Tile';
import {OSM, XYZ} from 'ol/source';
import {Circle, Fill, Icon, Stroke, Style} from 'ol/style';

var config = {
	initialConfig: {
		lon: 1.59647,
		lat: 41.69689,
		zoom: 8,
		zoomGeolocation: 17,
		units: 'metric'
	},
	i18n: {
		layersLabel: 'Layers',
		editWith: 'Editar amb:',
		openWith: 'Obre amb:',
		checkTools: 'Validació:',
		nodeLabel: 'Node:',
		noNodesFound: 'No s\'ha trobat cap resultat en aquesta àrea.',
		wayLabel: 'Way:'
	},
	overpassApi: function(){
		// https://overpass-turbo.eu/
		var proxyOverpassApi = false;
		var overpassApi = 'https://overpass-api.de/api/interpreter';
		if (proxyOverpassApi)
		{
			overpassApi = 'https://mijndev.openstreetmap.nl/~ligfietser/fiets/api/interpreter/';
		}
		return overpassApi;
	},
	// Base layers
	layers: [
		new TileLayer({
			title: 'OpenStreetMap',
			iconSrc: 'img/osm_logo-layer.svg',
			source: new OSM()
		}),
		new TileLayer({
			title: 'OpenStreetMap B&W',
			iconSrc: 'img/osmbw_logo-layer.png',
			source: new XYZ({
				attributions: '&copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>',
				//url: 'https://toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'
				url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
			}),
			visible: false
		}),
		new TileLayer({// OpenStreetMap France https://openstreetmap.fr
			title: 'OpenStreetMap France',
			iconSrc: 'img/osmfr_logo-layer.png',
			source: new OSM({
				attributions: '&copy; <a href="https://www.openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
				url: 'https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'OpenMapSurfer',
			iconSrc: 'img/openroute_logo_layer.png',
			source: new XYZ({
				attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, powered by <a href="https://mapsurfernet.com/" target="_blank">MapSurfer.NET</a>',
				url: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'OpenCycleMap',
			iconSrc: 'img/opencycle_logo_layer.png',
			source: new XYZ({
				attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, powered by &copy; <a href="http://www.thunderforest.com/" target="_blank">Thunderforest</a>',
				url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=a5dd6a2f1c934394bce6b0fb077203eb'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'ArcGIS World Topo',
			iconSrc: 'img/worldtopomap_logo_layer.png',
			source: new XYZ({
				attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank">ArcGIS</a>',
				url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'Positron (CartoDB)',
			iconSrc: 'img/cartodb_logo_layer.png',
			source: new XYZ({
				attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions" target="_blank">CartoDB</a>',
				url: 'https://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'Dark Matter (CartoDB)',
			iconSrc: 'img/cartodb_logo_layer.png',
			source: new XYZ({
				attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions" target="_blank">CartoDB</a>',
				url: 'https://s.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
			}),
			visible: false
		}),
		new TileLayer({
			title: 'Google Maps',
			iconSrc: 'img/gmaps_logo_layer.png',
			source: new XYZ({
				attributions: '&copy; <a href="https://www.google.com/maps/" target="_blank">Google Maps</a>',
				url: 'https://mt{0-3}.google.com/vt/lyrs=m&z={z}&x={x}&y={y}'
			}),
			visible: false
		}),
		new TileLayer({// Google Sat
			title: 'Google Sat',
			iconSrc: 'img/gmaps_logo_layer.png',
			source: new XYZ({
				attributions: '&copy; <a href="https://www.google.com/maps/" target="_blank">Google Maps</a>',
				url: 'https://mt{0-3}.google.com/vt/lyrs=s&z={z}&x={x}&y={y}'
			}),
			visible: false
		})
	],
	/**
	* @type Array
	* Overlay
	* group: string nom del grup
	* title: string titol de la capa
	* query: string consulta tal como https://overpass-turbo.eu
	* iconSrc: string ruta de la imatge
	* style: function see https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html
	*/
	overlays: [
		// Overlay: Iniciatives
		{
			group: 'Iniciatives',
			title: 'Cobertura 112',
			query: 'node[emergency=access_point]({{bbox}});out skel;',
			iconSrc: 'img/icones/pal_cobertura.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/pal_cobertura.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'Desfibril·lador',
			query: 'node[emergency=defibrillator]({{bbox}});out skel;',
			iconSrc: 'img/icones/aed.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/aed.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'Vies sense nom (#1carrer1nom)',
			query: '(way[highway=residential][!name][!noname][!junction]({{bbox}});node(w);way[highway=pedestrian][!name][!noname][!junction]({{bbox}});node(w);way[highway=living_street][!name][!noname][!junction]({{bbox}});node(w);way[highway=unclassified][!name][!noname][!junction]({{bbox}});node(w););out;',
			iconSrc: 'img/base/line.png',
			iconStyle: 'background-color:#FF0000',
			style: function () {
				var fill = new Fill({
					color: 'rgba(255,0,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#FF0000',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 2
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'Passos de vianants (#1crossing1tag)',
			query: 'node[highway=crossing][crossing_ref]({{bbox}});out meta;',
			iconSrc: 'img/icones/crossing.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/crossing.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'No crossing (#1crossing1tag)',
			query: 'node[highway=crossing][!crossing]({{bbox}});out meta;',
			iconSrc: 'img/icones/crossingError.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/crossingError.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'Estacions monitoratge',
			query: '(node[man_made=monitoring_station]({{bbox}});node(w);way[man_made=monitoring_station]({{bbox}});node(w);relation[man_made=monitoring_station]({{bbox}});node(w););out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#00FF00',
			style: function () {
				var fill = new Fill({
					color: 'rgba(0,255,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#00FF00',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Iniciatives',
			title: 'Fonts d\'aigua potable',
			query: 'node[amenity=drinking_water]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#0000FF',
			style: function () {
				var fill = new Fill({
					color: 'rgba(0,0,255,0.4)'
				});
				var stroke = new Stroke({
					color: '#0000FF',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		// Mobilitat
		{
			group: 'Mobilitat',
			title: 'Radars',
			query: 'node[highway=speed_camera]({{bbox}});out meta;',
			iconSrc: 'img/icones/radar.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/radar.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'crossing=traffic_signals',
			query: 'node[highway=crossing][crossing=traffic_signals]({{bbox}});out meta;',
			iconSrc: 'img/icones/trafficlight.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/trafficlight.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'crossing=no',
			query: 'node[highway=crossing][crossing=no]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#FF0000',
			style: function () {
				var fill = new Fill({
					color: 'rgba(255,0,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#FF0000',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'crossing=uncontrolled',
			query: 'node[highway=crossing][crossing=uncontrolled]({{bbox}});out meta;',
			iconSrc: 'img/icones/crossing_uncontrolled.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/crossing_uncontrolled.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'ES:R1 backward',
			query: 'node["traffic_sign:backward"="ES:R1"]({{bbox}});out meta;',
			iconSrc: 'img/icones/ES_R1.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/ES_R1.png'
					})
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'ES:R2 backward',
			query: 'node["traffic_sign:backward"="ES:R2"]({{bbox}});out meta;',
			iconSrc: 'img/icones/ES_R2.png',
			style: function () {
				var style = new Style({
					image: new Icon({
						src: 'img/icones/ES_R2.png'
					})
				});
				return style;
			}
		},

		// Mobilitat (Exprés.cat)
		{
			group: 'Mobilitat',
			title: 'Exprés.cat (Barcelona)',
			query: '(relation["network"="exprés.cat (Barcelona)"]({{bbox}});way(r)({{bbox}});node(w););out skel;',
			iconSrc: 'img/base/line.png',
			iconStyle: 'background-color:#40E0D0',
			style: function () {
				var fill = new Fill({
					color: 'rgba(64,224,208,0.4)'
				});
				var stroke = new Stroke({
					color: '#40E0D0',
					width: 5
				});
				var style = new Style({
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'Exprés.cat (Girona)',
			query: '(relation["network"="exprés.cat (Girona)"]({{bbox}});way(r)({{bbox}});node(w););out skel;',
			iconSrc: 'img/base/line.png',
			iconStyle: 'background-color:#40E0D0',
			style: function () {
				var fill = new Fill({
					color: 'rgba(64,224,208,0.4)'
				});
				var stroke = new Stroke({
					color: '#40E0D0',
					width: 5
				});
				var style = new Style({
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'Exprés.cat (Tarragona)',
			query: '(relation["network"="exprés.cat (Tarragona)"]({{bbox}});way(r)({{bbox}});node(w););out skel;',
			iconSrc: 'img/base/line.png',
			iconStyle: 'background-color:#40E0D0',
			style: function () {
				var fill = new Fill({
					color: 'rgba(64,224,208,0.4)'
				});
				var stroke = new Stroke({
					color: '#40E0D0',
					width: 5
				});
				var style = new Style({
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Mobilitat',
			title: 'Exprés.cat (Lleida)',
			query: '(relation["network"="exprés.cat (Lleida)"]({{bbox}});way(r)({{bbox}});node(w););out skel;',
			iconSrc: 'img/base/line.png',
			iconStyle: 'background-color:#40E0D0',
			style: function () {
				var fill = new Fill({
					color: 'rgba(64,224,208,0.4)'
				});
				var stroke = new Stroke({
					color: '#40E0D0',
					width: 5
				});
				var style = new Style({
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},

		//Reciclatge
		{
			group: 'Reciclatge',
			title: 'Paper',
			query: 'node["recycling:paper"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#0000FF',
			style: function () {
				var fill = new Fill({
					color: 'rgba(0,0,255,0.4)'
				});
				var stroke = new Stroke({
					color: '#0000FF',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Vidre',
			query: 'node["recycling:glass_bottles"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#00FF00',
			style: function () {
				var fill = new Fill({
					color: 'rgba(0,255,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#00FF00',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Envasos',
			query: 'node["recycling:cans"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#FFFF00',
			style: function () {
				var fill = new Fill({
					color: 'rgba(255,255,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#FFFF00',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Orgànic',
			query: 'node["recycling:organic"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#A52A2A',
			style: function () {
				var fill = new Fill({
					color: 'rgba(165,42,42,0.4)'
				});
				var stroke = new Stroke({
					color: '#A52A2A',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Rebuig',
			query: 'node["recycling:waste"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#000000',
			style: function () {
				var fill = new Fill({
					color: 'rgba(0,0,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#000000',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Piles',
			query: 'node["recycling:batteries"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#FF0000',
			style: function () {
				var fill = new Fill({
					color: 'rgba(255,0,0,0.4)'
				});
				var stroke = new Stroke({
					color: '#FF0000',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Oli',
			query: 'node["recycling:cooking_oil"="yes"][!access]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#6A5ACD',
			style: function () {
				var fill = new Fill({
					color: 'rgba(106,90,205,0.4)'
				});
				var stroke = new Stroke({
					color: '#6A5ACD',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},
		{
			group: 'Reciclatge',
			title: 'Privats',
			query: 'node[recycling_type=container][access=private]({{bbox}});out meta;',
			iconSrc: 'img/base/circle.svg',
			iconStyle: 'background-color:#808080',
			style: function () {
				var fill = new Fill({
					color: 'rgba(128,128,128,0.4)'
				});
				var stroke = new Stroke({
					color: '#808080',
					width: 1.25
				});
				var style = new Style({
					image: new Circle({
						fill: fill,
						stroke: stroke,
						radius: 5
					}),
					fill: fill,
					stroke: stroke
				});
				return style;
			}
		},

	],

	//Es crida sempre que es fa click sobre el mapa
	onClickEvent: function(evt, view, coordinateLL) {

		var edit = $('<div>').html(config.i18n.editWith);
		//ID editor
		edit.append($('<a>').css('marginLeft', 5).attr({title: 'iD', href: 'https://www.openstreetmap.org/edit?editor=id&lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + view.getZoom(), target: '_blank'}).html($('<img>').attr({src: 'img/ID.svg', height: 20, width: 20})));
		//Potlatch 2 editor
		edit.append($('<a>').css('marginLeft', 5).attr({title: 'Potlatch 2', href: 'https://www.openstreetmap.org/edit?editor=potlatch2&lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + view.getZoom(), target: '_blank'}).html($('<img>').attr({src: 'img/potlatch2logobig.png', height: 20, width: 20})));
		//JOSM editor
		edit.append($('<a>').css('marginLeft', 5).attr({title: 'JOSM', href: 'https://www.openstreetmap.org/edit?editor=remote&lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + view.getZoom(), target: '_blank'}).html($('<img>').attr({src: 'img/JOSM Logotype 2019.svg', height: 20, width: 20})));

		var open = $('<div>').html(config.i18n.openWith);
		//OSM
		open.append($('<a>').css('marginLeft', 5).attr({title: 'OSM', href: 'https://www.openstreetmap.org/?lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + view.getZoom(), target: '_blank'}).html($('<img>').attr({src: 'img/osm_logo-layer.svg', height: 20, width: 20})));
		//Here WeGo
		open.append($('<a>').css('marginLeft', 5).attr({title: 'HERE WeBo', href: 'https://wego.here.com/?map=' + coordinateLL[1] + ',' + coordinateLL[0] + ',' + Math.min(view.getZoom(), 18) + ',normal', target: '_blank'}).html($('<img>').attr({src: 'img/here_logo.png', height: 20, width: 20})));
		//Google
		open.append($('<a>').css('marginLeft', 5).attr({title: 'Google Maps', href: 'https://maps.google.es/maps?ll=' + coordinateLL[1] + ',' + coordinateLL[0] + '&z=' + Math.min(view.getZoom(), 21), target: '_blank'}).html($('<img>').attr({src: 'img/gmaps_logo_layer.png', height: 20, width: 20})));

		var tool = $('<div>').html(config.i18n.checkTools);
		//Notes a OSM
		tool.append($('<a>').css('marginLeft', 5).attr({title: 'Notes a OSM', href: 'https://www.openstreetmap.org/?lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + view.getZoom() + '&layers=N', target: '_blank'}).html($('<img>').attr({src: 'img/osm_logo-layer.svg', height: 20, width: 20})));
		//Keep right!
		tool.append($('<a>').css('marginLeft', 5).attr({title: 'Keep right!', href: 'https://www.keepright.at/report_map.php?lang=es&lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + Math.min(view.getZoom(), 19) + '&ch50=1&ch191=1&ch195=1&ch201=1&ch205=1&ch206=1&ch311=1&ch312=1&ch313=1&ch402=1&number_of_tristate_checkboxes=8&highlight_error_id=0&highlight_schema=0show_ign=1&show_tmpign=1&layers=B0T&ch=0%2C50%2C70%2C170%2C191%2C195%2C201%2C205%2C206%2C220%2C231%2C232%2C311%2C312%2C313%2C402', target: '_blank'}).html($('<img>').attr({src: 'img/keepright_logo.png', height: 20, width: 20})));
		//Geofabrik Tools
		tool.append($('<a>').css('marginLeft', 5).attr({title: 'Geofabrik Tools', href: 'https://tools.geofabrik.de/osmi/?lon=' + coordinateLL[0] + '&lat=' + coordinateLL[1] + '&zoom=' + Math.min(view.getZoom(), 18) + '&view=tagging', target: '_blank'}).html($('<img>').attr({src: 'img/geofabrik.png', height: 20, width: 20})));
		
		return $.merge($.merge(edit, open), tool);
	},

	//Es crida per cada element trobat al fer click
	forFeatureAtPixel: function(evt, feature) {
		var node = $('<div>').css('borderTop', '1px solid');
		var metaNode = feature.get('meta');

		if (metaNode && metaNode['type']) {
			var nodeType = metaNode['type'];
			node.append([config.i18n[nodeType==='node' ? 'nodeLabel' : 'wayLabel'], ' ', $('<a>').css('fontWeight', 900).attr({href: 'https://www.openstreetmap.org/' + nodeType + '/' + feature.getId(), target: '_blank'}).html(feature.getId()), '<br/>']);
		} else {
			node.append([config.i18n.nodeLabel, ' ', $('<span>').css('fontWeight', 900).html(feature.getId()), '<br/>']);
		}

		$.each(feature.getProperties(), function (index, value) {
			if (typeof value !== 'object') {
				node.append([$('<a>').attr({href: 'https://wiki.openstreetmap.org/wiki/Key:' + index + '?uselang=ca', target: '_blank'}).html(index), ': ', value, '<br/>']);
			}
		});

		if (metaNode) {
			var metaNodeDiv = $('<div>').css({'borderLeft': '1px solid', 'margin': '2px 0 0 3px', 'paddingLeft': '3px'});
			$.each(metaNode, function (index, value) {
				if (index !== 'id' && index !== 'type' && index !== 'uid') {
					var valueEl = value;
					switch (index) {
						case 'user':
							valueEl = $('<a>').attr({href: 'https://www.openstreetmap.org/user/' + value, target: '_blank'}).html(value);
							break;
						case 'changeset':
							valueEl = $('<a>').attr({href: 'https://www.openstreetmap.org/changeset/' + value, target: '_blank'}).html(value);
							break;
					}
					metaNodeDiv.append([index, ': ', valueEl, '<br/>']);
				}
			});
			node.append(metaNodeDiv);
		}

		return node;
	},

	//Es crida sempre que es fa click sobre el mapa
	onClickEventExtra: function(evt, view, coordinateLL, numFeatures) {

		if (!numFeatures) {
			//TODO Consulta dels nodes proxims a la posicio
			var marge = 0.0003,
				query = 'node({{bbox}});out;';

			query = query.replace('{{bbox}}', (coordinateLL[1] - marge) + ',' + (coordinateLL[0] - marge) + ',' + (coordinateLL[1] + marge) + ',' + (coordinateLL[0] + marge));
			console.log('query:', query);
		}

		return {};
	}
};

export default config;
