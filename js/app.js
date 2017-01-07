/*jshint eversion:6*/
let questionReq = new XMLHttpRequest();
questionReq.addEventListener('load', questionReqListener);
questionReq.open('GET', './data/tmp.json');
questionReq.send();

let module = function() {

  function addMult() {

  }

  function addTrueFalse() {

  }

  function addCheckbox() {

  }

  function addOpen() {

  }

  return {
    addMult,
    addTrueFalse,
    addCheckbox,
    addOpen,
  }

};

module();
