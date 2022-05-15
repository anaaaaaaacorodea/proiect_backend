# Documentatie proiect_backend

## Linkuri utile

link video prezentare: https://youtu.be/Mg3KzTa6h8o

link aplicatie: https://powerful-savannah-95185.herokuapp.com/

## Introducere

Un API REST (cunoscută și ca API RESTful) este o interfață de programare a aplicațiilor (API sau API web) care se conformează constrângerilor stilului arhitectural REST și permite interacțiunea cu serviciile web RESTful.

API-urile Google Cloud sunt interfețe programatice pentru serviciile Google Cloud Platform. Acestea reprezintă o parte cheie a Google Cloud Platform, și permit dezvoltatorilor care le utilizează să adauge cu ușurință valoare tuturor aplicațiilor, de la calcul, la rețea, la stocare și la analiza datelor bazată pe învățare automată.

Pokémon este o serie de jocuri electronice de la Nintendo care a debutat în Japonia în februarie 1996 sub numele de Pokémon Green și Pokémon Red. Franciza a devenit ulterior extrem de populară în Statele Unite și în întreaga lume. Seria, produsă inițial pentru linia de console portabile Game Boy a companiei, a fost introdusă în 1998 în Statele Unite. În jocuri, jucătorii își asumă rolul de antrenori Pokémon, obținând monștri de desene animate și dezvoltându-i pentru a se lupta cu alți Pokémon. 

În consecință, a părut o idee potrivită să combin pasiunea utilizatorilor pentru Pokémon cu puterea API-urilor în Cloud pentru a crea un API REST care permite utilizatorilor să ghicească pokemonii lor favoriți pe baza unor indicii.

## Descrierea aplicației

Aplicația propune un joc de ghicitoare de pokemoni: utilizatorul primește o serie de indicii cu privire la un pokemon generat aleator din baza de date (tipul lui, câteva etichete și o serie de culori dominante extrase cu ajutorul API-ului Vision). Acesta trebuie să introducă în căsuțele de text o serie de detalii personale, numele pokemon-ului care consideră că se potrivește cel mai bine indiciilor și să aleagă limba în care dorește să afle descrierea pokemon-ului.

![image](https://user-images.githubusercontent.com/100942603/168465736-b9e2a3e3-53cc-408b-95cd-73533cb8c5ea.png)

În urma click-ului pe limba dorită, apare o nouă secțiune ce conține o poză cu pokemon-ul și descrierea lui în limba selectată. Utilizatorul poate apăsa pe butonul „Generate another pokemon” pentru a relua procesul. 

![image](https://user-images.githubusercontent.com/100942603/168465773-2f875e5b-b808-4b90-ac58-aea42f163741.png)

## Descrierea API-urilor

Aplicația este realizată printr-un API REST care utilizează două alte API-uri în cloud: Google Translate și Google Vision. 

API-ul REST constă în componenta de backend și componenta de frontend. În cadrul backend-ului sunt prezente, în linii mari, 3 componente: pagina de **index** care apelează toate ruterele necesare și stabilește port-ul pe care va rula aplicația, fișierele din folderul **routers** în care sunt prezente cele 3 rutere necesare (pentru răspunsurile ghicite, pentru pokemoni și ruterul utils care conține metodele care apelează funcțiile din API-urile cloud utilizate) și fișierele din folderul **utils** (unul pentru import-ul și utilizarea serviciului de translate, unul pentru import-ul și utilizarea serviciului de recunoaștere a imaginilor și dicționarul care conține obiectul json pentru maparea limbilor utilizate în funcția de traducere). 

Componenta de frontend conține, în linii mari, un folder cu **componentele** din interfața cu utilizatorul (Header, GenerateGuess, Guess, Results, toate apelate în componenta mare MainPage), unul cu fișiere **utile** (similar cu dicționarul menționat anterior), fișierul **App** care apelează componenta MainPage și fișierul **index.css** pentru stilizarea elementelor. 

În ceea ce privește API-urile în cloud utilizate, pe scurt, **Google Vision API** este un tool care este utilizat pentru obținerea de informații din imagini folosind machine learning în timp ce **Google Translate API** se ocupă cu traducerea de texte dintr-o anumită limbă în alta.

## Fluxurile de date

1. **Baza de date**

În prima fază, instanța bazei de date MySQL a fost creată în Google Cloud Platform – se creează instanța în interfață, se adaugă datele necesare (ID, parolă, versiunea de MySQL, regiunea).

![image](https://user-images.githubusercontent.com/100942603/168465929-7d49721b-fb8a-47ed-8bbf-154f4c22504b.png)

La instanța creată se adaugă un nou user și o conexiune autorizată.

![image](https://user-images.githubusercontent.com/100942603/168465935-adc0dba4-813b-4cf3-9e9b-00fa7e6a3c3f.png)

În MySQL Workbench deschidem o nouă conexiune și introducem datele necesare și user-ul creat în Google Cloud. În Workbench, după conectarea la baza de date, am definit baza de date utilizată și am creat cele două tabele necesare pentru aplicație – tabela guesses și tabela pokemons. 

Tabela **guesses** servește pentru query-ul din interfață cu numele, vârsta, pokemonul ghicit și limba pentru traducerea descrierii și are următoarea structură:

![image](https://user-images.githubusercontent.com/100942603/168465963-9a89603a-6e38-46db-9b28-d032942c2f6c.png)
 
Tabela **pokemons** servește pentru stocarea pokemon-ilor care vor fi selectați aleator pentru a fi ghiciți în interfață și are ur  mătoarea structură:

![image](https://user-images.githubusercontent.com/100942603/168465968-7b30e5d1-39f5-401d-b679-d3380c191b81.png)
 
De asemenea, a tabela cu pokemoni a fost populată tot în acest punct cu 10 înregistrări.

![image](https://user-images.githubusercontent.com/100942603/168465977-a4c6ba3f-799b-47f5-8e7a-a42be1e0581e.png)

2. **Utilizarea API-urilor în Cloud**

Pentru utilizarea API-urilot în Cloud am utilizat Google Cloud Platform. După crearea contului, am activat serviciile de Translate și serviciul de Vision și am creat Service Account-ul și am generat cheia pentru a le folosi. Ulterior, am adăugat în proiect credențialele și am instalat pachetele necesare pentru utilizarea serviciilor.

![image](https://user-images.githubusercontent.com/100942603/168466006-38a452c9-b052-4d72-9c50-2da3de3d64fd.png)

3. **Metode HTTP și exemple de request / response**

Metodele HTTP utilizate în proiect se regăsesc în cele trei rutere amintite anterior, sunt de 4 tipuri: GET, POST, PUT și DELETE și folosesc toate mecanisme request/response. Metodele au fost testate în Postman și utilizate în interfața aplicației.

![image](https://user-images.githubusercontent.com/100942603/168466027-beee9fba-2467-4e9d-8bbf-1f88018fcac4.png)

În ruterul **guessesRouter** se găsesc toate cele 4 tipuri de metode în diverse forme: un GET pentru selectarea tuturor înregistrărilot din tabela guesses, un GET care ține cont de id-ul introdus (adaugă condiția WHERE în query), un POST care permite adăugarea unei noi înregistrări în tabela guesses, un DELETE care ține cont de id-ul introdus pentru a șterge o înregistrare și o metodă PUT pentru update-ul unei înregistrări care primește de asemenea id-ul înregistrării ce trebuie modificată.

**Exemplificarea metodelor prin Postman:**

- **GET**

![image](https://user-images.githubusercontent.com/100942603/168466067-19a582c8-4f29-42a1-82d3-a8eb27417dfa.png)
![image](https://user-images.githubusercontent.com/100942603/168466074-1b1f250a-ff83-451d-a1de-7535f591e495.png)

- **POST**

![image](https://user-images.githubusercontent.com/100942603/168466080-031d11c4-35d6-4450-bd0b-18592e6d20e6.png)
![image](https://user-images.githubusercontent.com/100942603/168466084-5f99532f-52e3-48e5-838a-baa9e50407fa.png)

- **PUT**

![image](https://user-images.githubusercontent.com/100942603/168466094-cfc63d90-c5e2-42fa-a9ca-a2da63f39fcd.png)
![image](https://user-images.githubusercontent.com/100942603/168466098-a40f5e19-87b7-46f6-9b7a-7b3b82079948.png)
![image](https://user-images.githubusercontent.com/100942603/168466105-f556fb92-6104-44c7-a989-f1d513609f04.png)

- **DELETE**

![image](https://user-images.githubusercontent.com/100942603/168466111-c4c674b0-2503-49b1-988a-3097d6582dd4.png)
![image](https://user-images.githubusercontent.com/100942603/168466127-e4f06b68-4a50-4225-9c5c-ab686c78b3ff.png)

În routerul **pokemonsRouter** se regăsesc 3 tipuri de metode GET: un GET uzual care preia toate înregistrătile din baza de date, un GET by Id care preia înregistrarea cu un anumit Id și un GET care preia un pokemon random din „Pokedex”. Primele două metode sunt similare cu cele din ruterul anterior, deci, mă voi concentra pe explicarea și exemplificarea rutei pentru generare aleatorie.

![image](https://user-images.githubusercontent.com/100942603/168466133-d84ffa23-2ccf-4604-9d0f-9726ee4f61d8.png)

Metoda construită preia din baza de date toate ID-urile existente ale pokemonilor, construiește un vector de ID-uri din care alege „random” unul. Acel ID ales este introdus într-un nou query (similar cu metodele GET by ID) pentru a extrage datele pokemonul-ui ales. Aici se apelează inclusiv metodele pentru etichete și culori dominante di API-ul Vision. După culegerea informațiilor necesare se returnează un JSON cu acestea (ID pokemon, nume, tip, link-ul cu imaginea cu el, descrierea și etichetele și culorile dominante determinate cu Vision).

![image](https://user-images.githubusercontent.com/100942603/168466145-681bf59a-9a8d-495d-9209-d05d1d3e1e1f.png)

*culorile dominante au fost transformate în format rgb în funcția detectImageProperties din fișierul imageRecognitionFunctions pentru ușurința utilizării ulterioare în interfață.*

În **utilsRouter** se regăsesc metodele HTTP pentru API-urile în cloud utilizate: transalate și labels. Metoda de translate primește doi parametri (textul și limba în care se dorește tradus) și apelează funcția importată în utils. 

![image](https://user-images.githubusercontent.com/100942603/168466167-bd35adb5-2a51-4c1d-9664-9e5831a0c5c2.png)

Metoda labels primește un link în body și  returnează componenta cuetichete și cea cu culori dominante, apelând funcțiile detectLabels și detectImageProperties din uils.

![image](https://user-images.githubusercontent.com/100942603/168466172-35dae0cd-8f0e-42df-bca7-4993b34e6aaf.png)
![image](https://user-images.githubusercontent.com/100942603/168466175-07acb85d-3526-4261-ad30-ee4e8fac042f.png)

## Referințe 
Seminar Cloud Computing 2022 Guriță Alexandru
https://cloud.google.com/vision/?hl=en_US&_ga=2.133561678.-1914640957.1651918647
https://cloud.google.com/translate/docs/quickstarts?hl=en_US&_ga=2.133561678.-1914640957.1651918647
https://tailwindcss.com/docs/guides/create-react-app
https://www.pokemon.com/us/pokedex/













