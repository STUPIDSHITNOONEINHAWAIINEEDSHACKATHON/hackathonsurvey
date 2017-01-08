/*jshint eversion:6*/
let form = document.getElementById('content');
let btn = document.getElementById('nextBtn');

let module = function() {

  let colorIndex = 0;
  let startQ = 0;
  let endQ = 5;
  let totalQ = 0;
  let questions;


  btn.addEventListener('click', addBtnListener);

  let colors = ['#9EFF36', '#303030', '#FA5BA5', '#42B983', '#E6834A', '#9373C1', '#00B8A9', '#FF0000']

  function addBtnListener(event) {
    event.preventDefault();
    startQ = endQ;
    endQ += Math.floor(Math.random() * 10);
    if(endQ > totalQ) {
      endQ = totalQ;
    }
    colorIndex++;
    processData(questions)
    if(colorIndex > 9) {
      colorIndex = 0;
    }
  }
  function processData(data){
    for(let i = startQ; i < endQ; i++){
      let index = i;
      checkType(data[i], index);
    }
  }
  function hackReqHandler(){
    let data = JSON.parse(this.responseText);
    data = data.results;
    questions = data;
    totalQ = data.length;
    console.log(endQ, totalQ);
    processData(data);
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
    multDiv.style.backgroundColor = colors[colorIndex];
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
    boolDiv.style.backgroundColor = colors[colorIndex];
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
    openDiv.style.backgroundColor = colors[colorIndex];
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

