// BASEMAPS //
let osm = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let hdm = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let esrisat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
let esrigray = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> | © <a href="https://www.hotosm.org/">Humanitarian</a> | © <a href="https://www.esri.com/es-es/home">ESRI</a> | © <a href="https://github.com/Mr-Urbanist-MX">Mr Urbanist MX</a> | contributors'});
//  CONFIGURACIÓN LIENZO //
let map = L.map('map', {
    layers: [hdm],
    tap: false,
    center: new L.LatLng(19.50, -99.15),
    zoom: 10,
    minZoom: 6,
    fullscreenControl: true,
    fullscreenControlOptions: {
        title: 'Activar Pantalla completa',
        titleCancel: 'Apagar Pantalla completa'
    }
});
map.on('Activar Pantalla completa',
    function () {
        if (window.console) window.console.log('Activar Pantalla completa');
});
map.on('Apagar Pantalla completa',
    function () {
        if (window.console) window.console.log('Apagar Pantalla completa');
});
let toggleFullscreen = function () {
map.toggleFullscreen();
};
// TITULO //
let info = L.control();
    info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
        return this._div;
        };
        info.update = function (props) {
            this._div.innerHTML = `<h3>NSE - AMAI</h3>`;
        };
        info.addTo(map);
// SIDEPANEL CARACTERISITCAS//
let sidepanelLeft = L.control.sidepanel('mySidepanelLeft', {
    tabsPosition: 'left',
    darkMode: true,
    startTab: 'tab-1'
}).addTo(map);
// ESCALA //
let Escala = L.control.scale({ position: 'bottomright'}).addTo(map);
// MINIBASEMAP //
let MMUrl='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
let MMap = new L.TileLayer(MMUrl, {minZoom: 0, maxZoom: 10,});
let miniMap = new L.Control.MiniMap(MMap, { toggleDisplay: true, position: 'bottomleft'}).addTo(map);					
// CARTOGRAFIA GEOJSON (CAPAS) //
// POLIGONOS (CAPAS) //
let AB1 = L.geoJson(ab_1, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
        color: '#ffffff',
        fillColor: '#ff3399',
    };}}).addTo(map);

let C01 = L.geoJson(c_01, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
        color: '#ffffff',
        fillColor: '#2f75b5',
    };}}).addTo(map);

let C02 = L.geoJson(c_02, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
        color: 'ffffff',
        fillColor: '#9bc2e6',
    };}}).addTo(map);

let C03 = L.geoJson(c_03, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
                color: '#ffffff',
                fillColor: '#66ccff',
    };}}).addTo(map);

let D01 = L.geoJson(d_01, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
                color: '#ffffff',
                fillColor: '#00cdc8',
    };}}).addTo(map);

let D02 = L.geoJson(d_02, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
        color: '#ffffff',
        fillColor: '#ccffcc',
    };}}).addTo(map);

let E00 = L.geoJson(e_00, {style: function (feature){
    return {
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.9,
        color: '#000000',
        fillColor: '#ffffcc',
    };}}).addTo(map);

// ACTIVAR CAPAS //
let baseLayers = {
        'OpenStreetMap Humanitarian': hdm,
        'OpenStreetMap Standard': osm,
        'ESRI Satelital': esrisat,
        'ESRI Dark Basemap': esrigray,
    };               
let overlays = {
        "Nivel Socio Económico - A/B": AB1,
        "Nivel Socio Económico - C+" : C01,
        "Nivel Socio Económico - C"  : C02,
        "Nivel Socio Económico - C-" : C03,
        "Nivel Socio Económico - D+" : D01,
        "Nivel Socio Económico - D"  : D02,
        "Nivel Socio Económico - E"  : E00,
    };
let layerControl = L.control.layers(baseLayers, overlays, {collapsed: false,}).addTo(map);
// RESET VIEW (REGRESAR VISTA IN INICIAL) //
L.control.resetView({
    position: "topleft",
    title: "Posición inicial",
    latlng: L.latLng([19.50, -99.15]),
    zoom: 10,
}).addTo(map);