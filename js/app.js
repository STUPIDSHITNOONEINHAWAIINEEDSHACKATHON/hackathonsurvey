/*jshint eversion:6*/

let module = function() {

  function reqHandler() {
    let data = JSON.parse(this.responseText);
    data = data.results
      console.log(data);
    for(let i = 0; i < data.length; i++) {
      checkType(data[i]);
    }
  }

  function requestData() {
    let questionReq = new XMLHttpRequest();
    questionReq.addEventListener('load', reqHandler);
    questionReq.open('GET','./data/tmp.json');
    questionReq.send();

  }

  function checkType(data) {
    switch(data.type) {
      case 'multiple':
        addMult(data);
        break;

      case 'boolean':
        addTrueFalse(data);
        break;

      case 'open':
      default:
        addOpen(data);
    }
  }

  function addMult(data) {

  }

  function addTrueFalse(data) {

  }


  function addOpen(data) {

  }

  return {
    requestData,
    addMult,
    addTrueFalse,
    addOpen,
  }

};

let app = module();
app.requestData();
