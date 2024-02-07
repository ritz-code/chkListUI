//Creates a new xmlhttp-request object
let http = new XMLHttpRequest();

//the variable http holds all the methods and properties of the payload object
http.open('get', './data/payload.json', true);

http.send();

http.onload = function() {
    if(this.readyState == 4 && this.status == 200) {
        let dataObject = JSON.parse(this.responseText);
        var flattenedObjArray = [];

        if(dataObject!=null) {
            flattenedObjArray = getFlattenedObjArray(dataObject);
        }
        console.log(flattenedObjArray);
        populateChkListTable(flattenedObjArray);
    }
}

//flattens the json payload
function getFlattenedObjArray(obj) {
    let flattenedObjArray = [];

    for(let[key, values] of Object.entries(obj)) {
 
     //checks and proceeds only if the value is an array
     if(values && Array.isArray(values)) {

         for(let elem of values) {
             let flattenedObj = {};
             flattenedObj.group = key;
             flattenedObj.description = elem.description;
             flattenedObj.action = elem.Action;
            
             flattenedObjArray.push(flattenedObj);
         }
     }
    }
    return flattenedObjArray;
 } 

 //populates the data table with payload json data
 function populateChkListTable(data) {
    var i = 0;
    var elemGroupNameOrig = [];

    for(elem of data) {
    
        $("#chkListTable").append(`<tr >
                      <td class="groupName">${!elemGroupNameOrig.includes(elem.group) ? elem.group : ""} </td>
                      <td class="desc">${elem.description}</td>
                      <td>${elem.action}</td>
                      <td>
                      <input type="checkbox" id="input-${i}" class="check-input">
                      <label for="input-${i}" class="checkbox">
                          <svg viewBox="0 0 22 16" fill="none">
                              <path d="M1 6.85L8.09677 14L21 1" />
                          </svg>
                      </label>
                      </td>
                      </tr>`);
        
      if(!elemGroupNameOrig.includes(elem.group)) {
            elemGroupNameOrig.push(elem.group);
        } 
            
        i++;
    }

    console.log(elemGroupNameOrig);

    $(document).ready(function () {
        $('#chkListTable').DataTable(
            {
                "paging": true,
                "pageLength": 7,
                "ordering": false
            }
        );
    });

 }




