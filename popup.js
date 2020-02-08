
/** 
 *  -------------
 *  Display a popup with feature information and more.
 */

var mapPanel, popup;
var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());

Ext.onReady(function() {
	
	// create map instance
    var map = new OpenLayers.Map({
		controls: [
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.Zoom(),
			new OpenLayers.Control.MousePosition(),
			new OpenLayers.Control.ScaleLine(),
			//new OpenLayers.Control.LayerSwitcher(),
			//new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.ArgParser()
			],
			allOverlays: false, 
			fallThrough: true
	});
    
    //create the layers 
    var wmsLayer = new OpenLayers.Layer.WMS(
            "OpenStreetMap WMS",
            "https://ows.terrestris.de/osm/service?",
            {layers: 'OSM-WMS'},
            {
                attribution: '&copy; terrestris GmbH & Co. KG <br>' +
                    'Data &copy; OpenStreetMap ' +
                    '<a href="http://www.openstreetmap.org/copyright/en"' +
                    'target="_blank">contributors<a>'
            }
    );
    
    var natura = new OpenLayers.Layer.WMS("Περιοχές Natura 2000",
		"http://localhost:8080/geoserver/karla/wms/natura_k",
        {layers: 'natura_k',
         format: 'image/png',
         transparent: true
         },
         {
          singleTile: true,
          opacity: 0.4
         }
     ); 
     
     var roads = new OpenLayers.Layer.WMS("Πολυ-θεματική Διαδρομή",
		"http://localhost:8080/geoserver/karla/wms/roads_diadromi",
        {layers: 'roads_diadromi',
         format: 'image/png',
         transparent: true
         },
         {
          singleTile: true,
          opacity: 1
         }
     );   

     map.addLayers([wmsLayer, natura, roads]);
	 
	 //create diadromi
	 var diadromi = {
		 'type': 'FeatureCollection',
		 'features': [
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Θέση "Τσερλή"',
				 'num': 17,
				 'info': 'Ελληνιστική αγροικία που βρίσκεται 2χλμ. ανατολικά του οικισμού Καλαμάκι του Δ.Κιλελέρ (2ος αιώνας π.Χ.',
				 'img': '<center><img src="data/tserli.png" alt="karla" width="200" height="200"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.757, 39.557]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Λίμνη Κάρλα',
				 'num': 16,
				 'info': "Ένας από τους σπουδαιότερους υγροβιότοπους με τοπία εξαιρετικής ομορφιάς. Φιλοξενεί καθ' όλη τη διάρκεια του χρόνου εκατοντάδες είδη πτηνών (μεταξύ αυτών, πουλιά που απειλούνται με εξαφάνιση). Οι επισκέπτες μπορούν να απολαύσουν δραστηριότητες άθλησης και αναψυχής όπως ιππασία, ποδηλασία και παρατήρηση πουλιών περιμετρικά της λίμνης. Δείτε το <a href='https://www.youtube.com/watch?v=g-jkdQa3fFQ'>Βίντεο της λίμνης</a>",
				 'img': "<center><img src='data/2512554.jpg' alt='karla' width='200' height='120'></br></br><img src='data/2512556.jpg' alt='karla' width='200' height='120'></center>"   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.824, 39.488]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Καλαμάκι',
				 'num': 1,
				 'info': 'Ο οικισμός Καλαμακίου βρίσκεται σε απόσταση 32χλμ. από την πόλη της Λάρισας, δίπλα στον ταμιευτήρα της λίμνης Κάρλας. Στην πλατεία του χωριού θα βρείτε καφενεία και ταβέρνες. Υπάρχει η δυνατότητα ποδηλασίας περιμετρικά της λίμνης. Για περισσότερες πληροφορίες επισκεφθείτε την ιστοσελίδα <a href="https://www.myvillage.gr/villages/kalamaki-larisas">MyVillage</a>',
				 'img': '<center><img src="data/kalamaki.JPG" alt="karla" width="200" height="150"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.747, 39.571]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Έλαφος',
				 'num': 2,
				 'info': 'Βρίσκεται στις πλαγιές του Μαυροβουνίου (σε υψόμετρο 480μ.), 6χλμ. από τον οικισμό Καλαμακίου. Περιβάλλεται από πυκνό δάσος και εκεί βρίσκεται το αξιόλογο θρησκευτικό μνημείο της Μονής Καμπάνας του 19ου αιώνα. Η πλατεία του χωριού αποτελεί αφετηρία του μονοπατιού που συνδέεται με το διεθνές μονοπάτι Ο2.</br> Για θέματα τοπικής αυτοδιοίκησης και συμμετοχής σε διαβουλεύσεις επισκεφθείτε την ιστοσελίδα του <a href="http://www.dimosagias.gr/o-dimos/dimotiki-enotita-agias/topiki-koinotita-elafou.html">Δήμου Αγιάς.</a></br> Για περισσότερες πληροφορίες για τα χαρακτηριστικά, τις εκδηλώσεις και τα ιστορικά στοιχεία της περιοχής επισκεφθείτε την ιστοσελίδα <a href="http://kalagias.weebly.com/epsilonlambdaalphaphiomicronsigma.html">Γρηγόρης Καλαγιάς.</a>',
				 'img': '<center><img src="data/elafos_kabana.png" alt="karla" width="300" height="100"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.783, 39.578]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Κανάλια',
				 'num': 3,
				 'info': 'Βρίσκεται σε απόσταση 18χλμ. από τον οικισμό Καλαμακίου, κτισμένο αμφιθεατρικά στους πρόποδες του Μαυροβουνίου. Η κεντρική πλατεία του χωριού αποτελεί ένα υπαίθριο μουσείο, καθώς εκεί μπορείτε να δείτε απομεινάρια από ψαροκαλύβες και την παραδοσιακή βάρκα της λίμνης. Εκεί θα βρείτε και το Μουσείο Λιμναίου Πολιτισμού που αναπτύχθηκε στην ευρύτερη περιοχή. Για περισσότερες πληροφορίες επισκεφθείτε την ιστοσελίδα <a href="https://www.myvillage.gr/villages/kanalia-magnisias">MyVillage</a> και την ιστοσελίδα <a href="http://www.karlaschool.gr/%CE%BA%CE%B5%CE%BC%CE%B5%CE%B2%CE%BF/">KarlaSchool</a> για την ενημέρωση σε εκπαιδευτικά προγράμματα, δράσεις, ανακοινώσεις σχετικά με την πρόοδο των εργασιών της ανασύστασης της λίμνης.',
				 'img': '<center><img src="data/psarokaliva_varka.png" alt="karla" width="300" height="150"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.886, 39.499]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Στεφανοβίκειο',
				 'num': 4,
				 'info': 'Βρίσκεται σε απόσταση 18χλμ. από τον οικισμό Κανάλια. Υπάρχει το Λαογραφικό Μουσείο Στεφανοβίκειου, το οποίο βρίσκεται σε διαδικασία μεταστέγασής του και προσωρινά είναι μη επισκέψιμο. Για περισσότερες πληροφορίες για την ιστορία, τα έθιμα και τις πολιτιστικές δράσεις επισκεφθείτε την ιστοσελίδα της <a href="https://sites.google.com/site/otopospouzesame/home">κοινότητας.</a>',
				 'img': '<center><img src="data/stefanovikeio.JPG" alt="karla" width="200" height="200"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.742, 39.463]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Αρχαιολογικός χώρος Παλιόσκαλας',
				 'num': 18,
				 'info': "Προϊστορικός οικισμός στη βορειοανατολική όχθη της λίμνης Κάρλας.</br><a href='palioskala/palioskala.html'>Διαβάστε περισσότερα</a>",
				 'img': '<center><img src="data/palioskala2.png" alt="karla" width="200" height="200" align="middle"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.788, 39.537]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Πέτρα',
				 'num': 8,
				 'info': 'Σημείο με θέα τη λίμνη Κάρλα, καθώς πριν την αποξήρανσή της αποτελούσε νησάκι και την πρώτη από τις τρεις μεγαλύτερη ιχθυόσκαλα της λίμνης.',
				 'img': '<center><img src="data/petra_ixthioskala.png" alt="karla" width="300" height="120"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.744, 39.493]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Σημείο θέασης',
				 'num': 9,
				 'info': '',
				 'img': ''   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.757, 39.491]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Παρατηρητήριο λίμνης Κάρλας',
				 'num': 12,
				 'info': 'Κιόσκι και παρατηρητήριο πουλιών στη λίμνη',
				 'img': '<center><img src="data/paratiritirio2.png" alt="karla" width="200" height="180"></br></br><img src="data/paratiritirio3.png" alt="par" width="200" height="150"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.850, 39.507]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Πύργος',
				 'num': 13,
				 'info': 'Λόφος με παρατηρητήριο και χώρο αναψυχής',
				 'img': '<center><img src="data/pirgos.png" alt="karla" width="200" height="100"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.807, 39.514]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Ι.Ν.Αγίου Νικολάου',
				 'num': 5,
				 'info': 'Βυζαντινό μνημείο που βρίσκεται σε έκταση που βρισκόταν άλλοτε στην ανατολική όχθη της λίμνης (τέλος του 12ου ή 13ου αιώνα μ.Χ.)',
				 'img': '<center><img src="data/nikolaos.png" alt="karla" width="200" height="100"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.885, 39.482]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Σημείο θέασης',
				 'num': 10,
				 'info': '',
				 'img': ''   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.818, 39.553]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Διασταύρωση με Εθνικό μονοπάτι Ο2',
				 'num': 15,
				 'info': '',
				 'img': '<center><img src="data/o2.png" alt="karla" width="200" height="150"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.891, 39.541]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Χατζημισιώτικη μαγούλα',
				 'num': 11,
				 'info': 'Σημείο με θέα τη λίμνη Κάρλα, καθώς πριν την αποξήρανσή της αποτελούσε νησάκι',
				 'img': '<center><img src="data/244.jpg" alt="karla" width="200" height="150"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.798, 39.482]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Ι.Ν.Αγίου Αθανασίου',
				 'num': 6,
				 'info': 'Λόφος με ξωκλήσι του Αγίου Αθανασίου και θέα τη λίμνη Κάρλα',
				 'img': '<center><img src="data/athanasios.png" alt="karla" width="200" height="200"></center>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.834, 39.457]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Σπήλαιο Δρακοπήγαδο',
				 'num': 14,
				 'info': 'Το Δρακοπήγαδο, αποτελεί ένα μεγάλο κατακόρυφο σπήλαιο σε απόσταση 2 χλμ. από το χωριό Κανάλια και σε υψόμετρο 440 μέτρων. Έχει συνολικό βάθος περίπου 43 μ.και η είσοδός του έχει πλάτος περίπου 17 μ. όπου το μεγάλο άνοιγμα επιτρέπει το φωτισμό του μεγαλύτερου μέρους του σπηλαίου. Στα τοιχώματά του έχουν δημιουργηθεί δεκάδες σταλακτίτες, οι οποίοι είναι ορατοί από την είσοδό του. Απέχει μισή ώρα πεζή από το γραφικό χωριό Κανάλια. Από την είσοδό του έχει πανοραμική θέα όμως δεν είναι δυνατή η επίσκεψη του εσωτερικού του, εξαιτίας του μεγάλου βάθους του και του περιορισμένου σε έκταση δαπέδου του.',
				 'img': '<center><img src="data/IMG_9016.JPG" alt="karla" width="180" height="200"</center?>'   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.907, 39.507]
			 }
		 },
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Ι.Ν.Προφήτη Ηλία',
				 'num': 7,
				 'info': 'Λόφος με το ξωκλήσι του Προφήτη Ηλία στην κορυφή, το οποίο έχει πανοραμική θέα προς τις Γλαφυρές και την πεδιάδα του Ριζόμυλου-Στεφανοβίκειου',
				 'img': ''   
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.883, 39.444]
			 }
		 }
		 ]
	 };

     //rules gia to layer tis diadromis   
     var rulesDiadromi = [
        new OpenLayers.Rule({
			title: "Σύγχρονοι Οικισμοί",
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.LESS_THAN,
                property: "num",
                value: 5
            }),
            symbolizer: {
				externalGraphic: 'data/placeholder.png',
				graphicYOffset: -25,
                graphicWidth: 25,
                graphicHeight: 25
            }
        }),
        new OpenLayers.Rule({
			title: "Ιεροί Ναοί",
			filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "num",
                upperBoundary: 7,
                lowerBoundary: 5
            }),
            symbolizer: {
                externalGraphic: 'data/church.png',
                graphicWidth: 28,
                graphicHeight: 28
            }
        }),
        new OpenLayers.Rule({
			title: "Σημεία Θέασης",
			filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "num",
                upperBoundary: 11,
                lowerBoundary: 8
            }),
            symbolizer: {
                externalGraphic: 'data/vision.png',
                graphicWidth: 25,
                graphicHeight: 25
            }
        }),
        new OpenLayers.Rule({
			title: "Παρατηρητήρια",
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "num",
                upperBoundary: 13,
                lowerBoundary: 12
            }),
            symbolizer: {
                externalGraphic: 'data/binoculars.png',
                graphicWidth: 25,
                graphicHeight: 25
            }
        }),
        new OpenLayers.Rule({
			title: "Σπήλαιο",
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "num",
                value: 14
            }),
            symbolizer: {
                externalGraphic: 'data/cave.png',
                graphicWidth: 27,
                graphicHeight: 27
            }
        }),
        new OpenLayers.Rule({
			title: "Διασταύρωση",
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "num",
                value: 15
            }),
            symbolizer: {
                externalGraphic: 'data/sign.png',
                graphicYOffset: -27,
                graphicWidth: 27,
                graphicHeight: 27
            }
        }),
        new OpenLayers.Rule({
			title: "Λίμνη Κάρλα",
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "num",
                value: 16
            }),
            symbolizer: {
                externalGraphic: 'data/reed.png',
                graphicWidth: 26,
                graphicHeight: 26
            }
        }),
        new OpenLayers.Rule({
			title: 'Αρχαιολογικοί Χώροι',
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "num",
                upperBoundary: 18,
                lowerBoundary: 17
            }),
            symbolizer: {
                externalGraphic: 'data/parthenon.png',
                graphicWidth: 25,
                graphicHeight: 25
            }
        })
        ];   
	 
	 //create vector layers as diadromes and add features into it
	 var vec2 = new OpenLayers.Layer.Vector("Σημεία Διαδρομής",{
		 styleMap: new OpenLayers.StyleMap({
			 "default": new OpenLayers.Style({}, { rules: rulesDiadromi}),
		}),
		 //displayInLayerSwitcher: false,
	 });
	 vec2.addFeatures((new OpenLayers.Format.GeoJSON()).read(diadromi))
	 map.addLayer(vec2);
	
    // create select feature control
    var selectCtrl = new OpenLayers.Control.SelectFeature([vec2], {  
		clickout: true,
		toggle: false,
		hover: true,
		autoActivate: true
	});
	
	// define "createPopup" function
    function createPopup(feature) {
		//close existing popup
		if (popup) {
			popup.destroy();
		}
        popup = new GeoExt.Popup({
            title: '<div style="font-size: 13px">' + feature.attributes.name + '</div>',
            location: feature,
            width:300,
            html: '<div style="font-size: 12px">' + feature.attributes.info + "<br/><br/>" + feature.attributes.img + '</div>',
            maximizable: true,
            collapsible: true
        });
        
        // unselect feature when the popup
        // is closed
        
        popup.on({
            close: function() {
                if(OpenLayers.Util.indexOf(vec2.selectedFeatures,
                                           this.feature) > -1) {
                    selectCtrl.unselect(this.feature);
                }
            }
        });
        popup.show();
    };
    
    // create popup on "featureselected"
    vec2.events.on({
        featureselected: function(e) {
            createPopup(e.feature);
        }
    });
    
    var fields1 = [{name: 'name', type: 'string'}];
    
    var cols2 = [{
		header: "Όνομα",
		width: 200,
		dataIndex: "name"
	}];
	
    //create feature store by passing a vector layer
    featStore1 = new GeoExt.data.FeatureStore({
		layer: vec2,
		enablePaging: true,
		map: map,
		fields: fields1,
		autoLoad: true
	});
        
    var griddata = new Ext.grid.GridPanel ({
		store: featStore1,
		title: "<b>Σημεία Διαδρομής<b>",
		autoScroll: true,
		layout: 'fit',
		columnLines: true,
		columns: cols2,
		sm: new GeoExt.grid.FeatureSelectionModel(),
		selType: 'featuremodel'
	});   
	
	
	//create to periexomeno tou tree	
	var treeConfig = [
    {
        nodeType: "gx_overlaylayercontainer",
        expanded: true,
        // render the nodes inside this container with a radio button,
        // and assign them the group "foo".
        loader: {
            baseAttrs: {
                uiProvider: "layernodeui"
            }
        } 
    }];
    
    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);
    
    
    //create the tree
    var tree = new Ext.tree.TreePanel({
        border: true,
        title: "<b>Θεματικά Επίπεδα</b>",
        expanded: false,
        split: true,
        enableDD: true,
        collapsible: true,
        collapseMode: "maxi",
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false,
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
        root: {
			expanded: true,
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes. We use the treeConfig
            // from above, that we created with OpenLayers.Format.JSON.write.
            children: Ext.decode(treeConfig)
        },
        rootVisible: false,
        lines: false
        
    });
	
	
	//create the palioskala layer
	var palioskala = {
		 'type': 'FeatureCollection',
		 'features': [
		 {
			 'type': 'Feature',
			 'properties': {
				 'name': 'Παλαιόσκαλα Αγιάς',
			 },
			 'geometry': {
				 'type': 'Point',
				 'coordinates': [22.788, 39.537]
			 }
		 }]
	 };
	 
	  var rulesPalio = [
		new OpenLayers.Rule({
			title: 'Αρχαιολογικός χώρος',
            symbolizer: {
                externalGraphic: 'data/pin.png',
				graphicYOffset: -29,
                graphicWidth: 27,
                graphicHeight: 27,
                label: "${name}",
                labelOutlineWidth: 3,
                labelXOffset: 45,
                labelYOffset: 40,
                fontSize: "15px",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold"
            }
        })
        ];
	 
	 var palios = new OpenLayers.Layer.Vector("Παλαιόσκαλα Αγιάς",{
		 styleMap: new OpenLayers.StyleMap({
			 "default": new OpenLayers.Style({}, {rules: rulesPalio})
		})
	});
		 
		 
		
	 palios.addFeatures((new OpenLayers.Format.GeoJSON()).read(palioskala))
	 map.addLayer(palios);
	
	//create mapPanel			
	mapPanel = new GeoExt.MapPanel ({
		id: "container",
		title: "Χάρτης",
		region: "center",
		xtype: "gx_mappanel",
		map: map,
		fallThrough: true,
		layout: 'fit',
		center: [22.745,39.542],
        zoom: 11
	});
						
	mapPanel.map.addControl(selectCtrl);
    selectCtrl.activate();
    
 
    //create legendPanel
   var legendPanel = new GeoExt.LegendPanel({
	    title: "<b>Υπόμνημα</b>",
        autoScroll: true,
        collapsible: true,
        expanded: true,
        enableDD: true
    });
    
    
   //create Description Panel 
   var descPanel = new Ext.Panel({
	    title: "<b>Περιγραφή Διαδρομής</b>",
	    layout: 'fit',
        split: true,
        collapsible: true,
        expanded: true,
        enableDD: true,
        contentEl: "description"
    });
         
	//create map Panel (in a Viewport)
	new Ext.Viewport ({
		layout: "border",
		renderTo: Ext.getBody(),
		items: [mapPanel,
		 {
			region: "north",
			contentEl: "title",
			height: 100
		},  {
			region: "west",
			title: "Διαδρομή και Σημεία",
			width: 200,
			layout: 'accordion',
			collapsible: true,
			collapseMode: "maxi",
			autoScroll: true,
			split: true,
			items: [griddata, descPanel]
		}, {
			title: 'Θεματικά Επίπεδα και Υπόμνημα',
			region: "east",
			width: 200,
			layout: 'accordion',
			collapsible: true,
			collapseMode: "maxi",
			split: true,
			items: [tree, legendPanel ]
		}
		]
	});    
});
