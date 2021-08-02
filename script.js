import axios from './node_modules/@bundled-es-modules/axios/axios.js'
import {DataTable} from './node_modules/simple-datatables/dist/module/index.js'

const tbody = document.querySelector("#tbody");
const myTable = document.querySelector("#myTable");
const selectorMapElement = document.querySelector('#gmap_canvas');


const myAxios =()=> axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&limit=500")
    .then(response => {
        addToTable(response.data.result.records)
        return response
    })
    .then(response => {
        google.maps.event.addDomListener(window, 'load', addAtmToMap(response.data.result.records));
    })
    .catch(err => console.log(err))


myAxios()

const addToTable=(row)=>{
         for (let i = 0; i <row.length; i++) { 
            tbody.innerHTML += `
                     <tr>
                        <td>${row[i].Bank_Name}</td>
                        <td>${row[i].ATM_Address}</td>
                        <td>${row[i].City}</td>
                        <td>${row[i].Branch_Code}</td>
                        <td>${row[i].Bank_Code}</td>
                    </tr>`
         }
     const dataTable = new DataTable(myTable);
}

const addAtmToMap=(row)=>{
    for(let i=0; i<row.length; i++){
        if(row[i].X_Coordinate===null || row[i].X_Coordinate===0 || row[i].Y_Coordinate===null || row[i].Y_Coordinate===0)
        continue
        if(!isNaN(row[i].X_Coordinate) && !isNaN(row[i].Y_Coordinate))
        if(row[i].X_Coordinate>32 && row[i].Y_Coordinate<34)
        init_map(row[i].Y_Coordinate,row[i].X_Coordinate,row[i].Bank_Name,row[i].ATM_Address)
        else 
        init_map(row[i].X_Coordinate,row[i].Y_Coordinate,row[i].Bank_Name,row[i].ATM_Address)
    }
}

const myOptions = {
    zoom: 8,
    center: new google.maps.LatLng(31.3773277, 35.8210358),
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

const map = new google.maps
.Map(selectorMapElement, myOptions)

const init_map=(googleMapLat,googleMapLong,googleMapTitle,googleMapAddress)=> {

    const infowindow = new google.maps.InfoWindow({
        content: `
        <div class="divMap">
          <strong>${googleMapTitle}</strong>
          <br>${googleMapAddress}<br>
          </div>
        `
    });
    
    let marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(googleMapLat, googleMapLong)
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
