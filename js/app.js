/*jshint eversion:6*/

let form = document.getElementById('form');

let module = function() {


  // function reqHandler() {
  //   let data = JSON.parse(this.responseText);
  //   data = data.results;
  //     console.log(data);
  //   for(let i = 0; i < data.length; i++) {
  //     checkType(data[i]);
  //   }
  // }

  function hackReqHandler(){
    let data = JSON.parse(this.responseText);
    data = data.results;
    console.log(data);
    for(let i = 0; i < data.length; i++){
      let index = i;
      checkType(data[i], index);
    }
  }

  function requestData(endpoint) {
    let questionReq = new XMLHttpRequest();
    questionReq.addEventListener('load', hackReqHandler);
    questionReq.open('GET', endpoint);
    questionReq.send();
  }




  function checkType(data, index) {
    switch(data.type) {
      case 'multiple':
        addMult(data, index);
        break;

      case 'boolean':
        addTrueFalse(data, index);
        break;

      case 'open':
      default:
        addOpen(data, index);
    }
  }

  function randomizeCorrectAns(array, correctAns){
     let index = Math.floor(Math.random() * (array.length + 1))
     array.splice(index, 0, correctAns);
     return array;
  }


  function addMult(data, index) {
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
      input.setAttribute('name', `answer${index}`);
      inputLabel.appendChild(input);
      inputLabel.appendChild(span);
      optionsDiv.appendChild(inputLabel);
    }
    multDiv.appendChild(label);
    multDiv.appendChild(optionsDiv);
    form.appendChild(multDiv);

  }


  function addTrueFalse(data, index) {
    let array = data.incorrect_answers;
    array.splice(1, 0, data.correct_answer);

    let boolDiv = document.createElement('div');
    boolDiv.classList.add('div-bool');
    let label = document.createElement('label');
    label.classList.add('label-bool');
    label.innerHTML = data.question;
    let optionsDiv = document.createElement('div');


    for(let i = 0; i < data.incorrect_answers.length; i++) {
      let inputLabel = document.createElement('label');
      let input = document.createElement('input');
      let span = document.createElement('span');
      span.innerHTML = data.incorrect_answers[i];
      input.setAttribute('type', 'radio');
      input.setAttribute('name', `answer${index}`);
      inputLabel.appendChild(input);
      inputLabel.appendChild(span);
      optionsDiv.appendChild(inputLabel);
    }
    boolDiv.appendChild(label);
    boolDiv.appendChild(optionsDiv);
    form.appendChild(boolDiv);

  }


  function addOpen(data) {
    let openDiv = document.createElement('div');
    openDiv.classList.add('div-open');
    let label = document.createElement('label');
    label.classList.add('label-open');
    label.innerHTML = data.question;
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    openDiv.appendChild(label);
    openDiv.appendChild(input);
    form.appendChild(openDiv);

  }

  return {
    requestData,
    addMult,
    addTrueFalse,
    addOpen,
  }

};



const app = module();

app.requestData( './data/tmp.json');
app.requestData( './data/hackathon.json');
