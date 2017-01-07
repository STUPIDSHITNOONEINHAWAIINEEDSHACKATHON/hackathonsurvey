/*jshint eversion:6*/

let module = function() {

  function requestHandler(){
    var data = JSON.parse(this.responseText);
    console.log(data);

  }

  function requestData(){
    let questionReq = new XMLHttpRequest();
    questionReq.addEventListener('load', requestHandler);
    questionReq.open('GET', './data/tmp.json');
    questionReq.send();    
  }

  function addMult(data) {


  }

  function addTrueFalse(data) {

  }

  function addCheckbox() {

  }

  function addOpen() {
    

  }

  return {
    requestData,
    addMult,
    addTrueFalse,
    addCheckbox,
    addOpen,
  }

};



const app = module();

app.requestData();