var RD = new L.Proj.CRS.TMS(
    'EPSG:28992',
    '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
    [-285401.92,22598.08,595401.9199999999,903401.9199999999], {
    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
});

//-- BRT
var BRTlayer = new L.TileLayer(
  'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png', {
    tms: true,
    minZoom: 3,
    maxZoom: 13,
    attribution: '© <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a>',
    continuousWorld: true
  }
);

//-- openbasiskaart.nl
var OBKlayer = new L.TileLayer(
  'http://www.openbasiskaart.nl/mapcache/tms/1.0.0/osm@rd/{z}/{x}/{y}.png', {
    tms: true,
    minZoom: 3,
    maxZoom: 13,
    attribution: '© <a href="http://www.openbasiskaart.nl">openbasiskaart.nl</a>',
    continuousWorld: true
  }
);


//-- Luchtphoto
var Photolayer = new L.TileLayer(
  'http://geodata1.nationaalgeoregister.nl/luchtfoto/tms/1.0.0/luchtfoto/EPSG28992/{z}/{x}/{y}.jpeg', {
    tms: true,
    minZoom: 3,
    maxZoom: 13,
    // attribution: '© <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>',
    continuousWorld: true
  }
);

//-- AHN2 WMS, 
//-- the layer ahn2_05m_ruw seems to be down though... switched to 5m gefiltered
//-- which is also often down it seems, great.
var AHN2layer = new L.tileLayer.wms(
  'http://geodata.nationaalgeoregister.nl/ahn2/wms?', {
    // layers: 'ahn2_5m',
    layers: 'ahn2_05m_ruw',
    crs: RD,
    format: 'image/png'
    // attribution: '© <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a>',
    // continuousWorld: true
  }
);

// var AHN2WMTSlayer = new L.TileLayer.WMTS( 
//   // 'http://geodata.nationaalgeoregister.nl/tiles/service/wmts/ahn2', {
//     'http://geodata.nationaalgeoregister.nl/tiles/service/wmts/ahn1', {
//     // layer: 'ahn2_05m_ruw',
//     layer: 'ahn1_5m',
//     style: 'default',
//     // tilematrixSet: 'EPSG:28992',
//     // matrixSet: RD,
//     // matrixIds: epsg28992matrixids,
//     format: 'image/png8'
//     // attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
//   }
// );

// var epsg28992matrixids = [];
// for (var i=0; i<22; ++i) {
//     epsg28992matrixids[i] = 'EPSG:28992:' + i;
//     topLeftCorner : new L.LatLng(20037508,-20037508);
// }

// // var m = new Array(22);
// // for (var i= 0; i<22; i++) {
// //     m[i]= {
// //         identifier    : "EPSG:28992:" + i,
// //         topLeftCorner : new L.LatLng(20037508,-20037508)
// //     };
// // }

var test = new L.TileLayer.WMTS( 
  // 'http://geodata.nationaalgeoregister.nl/tiles/service/wmts/ahn2', {
    // 'http://geodata.nationaalgeoregister.nl/tiles/service/wmts/ahn1?', {
    'http://www.openbasiskaart.nl/mapcache/wmts/', {
    layer: 'osm',
    style: 'default',
    matrixSet: RD,
    format: 'image/png'

    // matrixSet: 'EPSG:28992',
    // matrixIds: epsg28992matrixids,
    // attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
  }
);


//-- the AHN2 tiles
var AHN2tileslayer = new L.tileLayer.wms(
  'http://geodata.nationaalgeoregister.nl/ahn2/wms?', {
    layers: 'ahn2_bladindex',
    crs: RD,
    format: 'image/png'
    // attribution: '© <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a>',
    // continuousWorld: true
  }
);

var map = new L.Map('map', {
  continuousWorld: true,
  crs: RD,
  layers: [BRTlayer],
  center: new L.LatLng(52, 5.3),
  zoom: 3
});

var baseMaps = {
    "BRT": BRTlayer,
    "Openbasiskaart": OBKlayer,
    "Orthophoto": Photolayer,
    "AHN2": AHN2layer,
    // "AHN2WMTS": AHN2WMTSlayer,
    "test": test,
    "AHN2 tiles": AHN2tileslayer
};
L.control.layers(baseMaps).addTo(map);

// test RD coordinates
map.on('click', function(e) {
    if (window.console) {
        var point = RD.projection.project(e.latlng);
        console.log("RD X: " + point.x + ", Y: " + point.y);
    }
});
