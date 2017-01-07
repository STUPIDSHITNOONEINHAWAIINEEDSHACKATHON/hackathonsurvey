/*jshint eversion:6*/
let form = document.getElementById('form');

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

  function randomizeCorrectAns(array, correctAns){
     let index = Math.floor(Math.random() * (array.length + 1))
     array.splice(index, 0, correctAns);
     return array;
  }

  function addMult(data) {
    let multDiv = document.createElement('div');
    multDiv.classList.add('div-mult');
    let label = document.createElement('label');
    label.classList.add('label-mult');
    label.innerHTML = data.question;
    let optionsDiv = document.createElement('div');
    let answers = randomizeCorrectAns(data.incorrect_answers, data.correct_answer);

    for(let i = 0; i < answers.length; i++) {
      let inputLabel = document.createElement('label');
      let input = document.createElement('input');
      let span = document.createElement('span');
      span.innerHTML = data.incorrect_answers[i];
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'answer');
      inputLabel.appendChild(input);
      inputLabel.appendChild(span);
      optionsDiv.appendChild(inputLabel);
    }
    multDiv.appendChild(label);
    multDiv.appendChild(optionsDiv);
    form.appendChild(multDiv);

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



const app = module();

app.requestData();
