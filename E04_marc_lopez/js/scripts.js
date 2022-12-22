let first = true;

class petrolList {
    constructor() {
        this.list = [];
        this.map;
    }
	addStation(){
		let formname = document.getElementById("fname").value;
		let formlatitude = document.getElementById("flatitude").value;
		let formlongitude = document.getElementById("flongitude").value;
		console.log("Station name: " + formname + " Latitude: " + formlatitude + " Longitude: " + formlongitude);

		let interfaceDestination = document.getElementById("root2");
		interfaceDestination.innerHTML="";
            
		let newPE=new petrolStation2(formname, formlatitude, formlongitude);
		interfaceDestination.appendChild(newPE.createPE2Card());
        let marcador=newPE.createPE2Marker();
        marcador.setMap(this.map);
	}
    showList() {
        fetch('https://citmalumnes.upc.es/~davids/awug1_2223/07_maps/petrol/llista2.php')
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			//console.log('data = ', data);
			let dades=JSON.parse(data);
			
			let interfaceDestination = document.getElementById("root");
			interfaceDestination.innerHTML="";

			if(!first){
				this.list.forEach((value) => {
					value.setMap(null);
				});
				this.list = [];
			}

			first = false;
			
			//List heading
			let txt = document.createTextNode("Catalog:");
			let head = document.createElement("h1");
			head.appendChild(txt);
			interfaceDestination.appendChild(head);
            
			dades.benzineres.forEach((value) => {
				let newPE=new petrolStation(value.id, value.nom, value.adreca, value.lat, value.lon);
				interfaceDestination.appendChild(newPE.createPECard());
                let marcador=newPE.createPEMarker1();
                marcador.setMap(this.map);
				this.list.push(marcador);
			});
		})
		.catch((err) => {
			console.error(err);
		});

    }
	filterList() {
		fetch('https://citmalumnes.upc.es/~davids/awug1_2223/07_maps/petrol/llista24hs.php')
		.then((response) => {
			//console.log(response);
			return response.text();
		})
		.then((data) => {
			//console.log('data = ', data);
			let dades=JSON.parse(data);
			
			let interfaceDestination = document.getElementById("root");
			interfaceDestination.innerHTML="";
			
			//List heading
			let txt = document.createTextNode("Catalog:");
			let head = document.createElement("h1");
			head.appendChild(txt);
			interfaceDestination.appendChild(head);

			this.list.forEach((value) => {
				value.setMap(null);
			});
			this.list = [];
					
			dades.benzineres.forEach((value) => {
				let newPE=new petrolStation(value.id, value.nom, value.adreca, value.lat, value.lon);
				interfaceDestination.appendChild(newPE.createPECard());
				let marcador2=newPE.createPEMarker2();
                marcador2.setMap(this.map);
				this.list.push(marcador2);
			});
		})
		.catch((err) => {
			console.error(err);
		});

    }
	addMap(){
		let myLatlng = new google.maps.LatLng(41.56667, 2.01667);
		let myOptions = {
		zoom: 12,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}
}

class petrolStation{
	constructor(id, name, adress, latitude, longitude) {
        this.id = id;
		this.name = name;
		this.adress = adress;
		this.lat = latitude;
		this.lng = longitude;
		this.showPEDetails=this.showPEDetails.bind(this);
    }
	createPECard(){
		let card=document.createElement("article");
		let petrolName=document.createElement("span");
		petrolName.appendChild(document.createTextNode(this.name));
		petrolName.addEventListener("click",this.showPEDetails);
		card.appendChild(petrolName);
		return card;
	}
    createPEMarker1(){
		console.log("Total elements at full list");
        let myLatLng = new google.maps.LatLng(this.lat, this.lng);
        let marker = new google.maps.Marker({
        	position: myLatLng
        });
        return marker;
    }
	createPEMarker2(){
		console.log("Total elements at filtered list");
        let myLatLng = new google.maps.LatLng(this.lat, this.lng);
        let marker = new google.maps.Marker({
        	position: myLatLng
        });
        return marker;
    }
	showPEDetails(event){
		console.log(event);
		console.log(this);
		fetch('https://citmalumnes.upc.es/~davids/awug1_2223/07_maps/petrol/benzinera2.php?benzinera='+this.id)
		.then(function(response) {
			//console.log(response);
			return response.text();
		})
		.then(function(data) {
			//console.log('data = ', data);
			let dades=JSON.parse(data);
			
			//Iterface section selection + initial cleaning
			let interfaceDestination = document.getElementById("details");
			interfaceDestination.innerHTML="";
			
			//Details heading
			let txt = document.createTextNode(dades.benzinera.nom);
			let head = document.createElement("h2");
			head.appendChild(txt);
			interfaceDestination.appendChild(head);
			
			//Petrol station adress
			if((dades.benzinera.adreca!=null)&&(dades.benzinera.adreca!="")){
				let txt = document.createTextNode(dades.benzinera.adreca);
				let paragraf = document.createElement("p");
				paragraf.appendChild(txt);
				interfaceDestination.appendChild(paragraf);
			}
			
			//Petrol station phone
			if((dades.benzinera.telefon!=null)&&(dades.benzinera.telefon!="")){
				let txt = document.createTextNode(dades.benzinera.telefon);
				let paragraf = document.createElement("p");
				paragraf.appendChild(txt);
				interfaceDestination.appendChild(paragraf);
			}
			
			//Petrol station email + link
			if((dades.benzinera.email!=null)&&(dades.benzinera.email!="")){
				let txt = document.createTextNode(dades.benzinera.email);
				let paragraf = document.createElement("p");
				let mailLink = document.createElement("a");
				mailLink.href = "mailto:"+dades.benzinera.email;
				mailLink.appendChild(txt);
				paragraf.appendChild(mailLink);
				interfaceDestination.appendChild(paragraf);
			}
			
			//Petrol station opening hours
			if((dades.benzinera.horari!=null)&&(dades.benzinera.horari!="")){
				let txt = document.createTextNode(dades.benzinera.horari);
				let paragraf = document.createElement("p");
				paragraf.appendChild(txt);
				interfaceDestination.appendChild(paragraf);			
			}			
		})
		.catch(function(err) {
			console.error(err);
		});
		
		
		
	}
}

class petrolStation2{
	constructor(formname, formlatitude, formlongitude) {
		this.name = formname;
		this.lat = formlatitude;
		this.lng = formlongitude;
    }
	createPE2Card(){
		let card=document.createElement("article");
		let petrolName=document.createElement("span");
		petrolName.appendChild(document.createTextNode(this.name));
		card.appendChild(petrolName);
		return card;
	}
    createPE2Marker(){
        let myLatLng = new google.maps.LatLng(this.lat, this.lng);
        let marker = new google.maps.Marker({
        	position: myLatLng
        });
        return marker;
    }
}

let llista;
function mostraLlista(){
	llista=new petrolList();
	llista.showList();
	llista.addMap();
}