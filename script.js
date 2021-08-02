import axios from './node_modules/@bundled-es-modules/axios/axios.js'
import {DataTable} from './node_modules/simple-datatables/dist/module/index.js'

const tbody = document.querySelector("#tbody");
const myTable = document.querySelector("#myTable");


const myAxios =()=> axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&limit=300")
    .then(response => addToTable(response.data.result.records))
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

