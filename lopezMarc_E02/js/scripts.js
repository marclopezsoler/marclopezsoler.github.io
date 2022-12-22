function gamesList(){ //funció que es crida a l'inici
    let myDiv = document.getElementById("card-group"); //agafem el div ja creat per la primera llista d'elements
    fetch(	'https://api.rawg.io/api/games?key=88ac9540fefe4a59a5e78eac63da41ff') //fetch al link de la primera llista amb la clau
        .then(function(response) {
    		console.log(response);
            return response.text();
        })
        .then(function(data) {
            console.log('data = ', data); //imprimeix a la consola les dades de la llista
    		let dades=JSON.parse(data);
            for(i=0; i<dades.results.length; i++){ //passa per tots els elements de la llista
                console.log(dades.results[i].name); //imprimeix a la consola els noms

                let card = document.createElement('div'); //crea un div amb classe 'myCard'
                card.className = 'myCard';                

                let img = document.createElement('img'); //crea una imatge per cada element amb valor background_image de la llista, i li assigna la classe 'image'
                img.src = dades.results[i].background_image;
                img.className = 'image';

                let text = document.createElement('div'); //crea un div amb classe 'card-info'
                text.className = 'card-info'; 

                let title2 = document.createElement('p'); //crea un element de text on a dins està escrit la data i valoració de cada element de la llista
                title2.innerText = "Release date: " + dades.results[i].released + "\n" + "Average rating: " + dades.results[i].rating;

                let text2 = document.createElement('div'); //crea un div amb classe 'overview'
                text2.className = 'overview'; 

                let title = document.createElement('p'); //crea un element de text on a dins està escrit el nom de cada element de la llista i el text es passa a majúscules
                title.innerText = dades.results[i].name;
                title.className = 'text-uppercase';
                
                card.appendChild(img); //jerarquía de padres hijos, "myDiv" es padre de cada una de las cartas "card", y este contiene dentro la imagen y los dos textos, el texto "text" contiene el title
                card.appendChild(text); 
                card.appendChild(text2); 
                text.appendChild(title); 
                text2.appendChild(title2); 
                myDiv.appendChild(card); 
            }
        })
        .catch(function(err) {
            console.error(err);
        });

        let myDiv2 = document.getElementById("card-group2"); //agafem el div ja creat per la segona llista d'elements
        fetch(	'https://api.rawg.io/api/developers?key=88ac9540fefe4a59a5e78eac63da41ff') //fetch al link de la segona llista amb la clau
            .then(function(response2) {
        		console.log(response2);
                return response2.text();
            })
            .then(function(data2) {
                //el procediment és el mateix que amb el grup de cards anterior, la única diferència és la llista i els elements de la llista que es criden
                console.log('data = ', data2);
        		let dades2=JSON.parse(data2);
                for(i=0; i<dades2.results.length; i++){
                    console.log(dades2.results[i].name);

                    let card = document.createElement('div');
                    card.className = 'myCard2';
                    
                    let img = document.createElement('img');
                    img.src = dades2.results[i].image_background;
                    img.className = 'image2';

                    let text = document.createElement('div');
                    text.className = 'card-info2'; 

                    let title = document.createElement('p');
                    title.innerText = dades2.results[i].name;
                    title.className = 'text-uppercase';

                    card.appendChild(img);
                    card.appendChild(text);
                    text.appendChild(title);
                    myDiv2.appendChild(card);
                }
            })
            .catch(function(err) {
                console.error(err);
            });
}