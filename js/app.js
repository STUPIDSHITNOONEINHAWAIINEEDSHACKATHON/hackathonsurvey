/*jshint eversion:6*/
let form = document.getElementById('content');
let btn = document.getElementById('nextBtn');


let module = function() {

  let colorIndex = 0; // 0 to 9
  let startQ = 0;
  let endQ = 5;
  let totalQ = 0;
  let questions;

  btn.addEventListener('click', addBtnListener);

  const colors = ['#9EFF36', '#85C1E9', '#FA5BA5', '#42B983', '#E6834A', '#9373C1', '#00B8A9', '#FF0000', '#FFF700'];
  const audioFiles = [
    'Blip_Select.wav',
    'Blip_Select2.wav',
    'Blip_Select3.wav',
    'Blip_Select4.wav',
    'Explosion7.wav',
    'Explosion15.wav',
    'Explosion16.wav',
    'Hit_Hurt.wav',
    'Hit_Hurt46.wav',
    'Jump.wav',
    'Jump2.wav',
    'Jump3.wav',
    'Jump4.wav',
    'Jump5.wav',
    'Laser_Shoot17.wav',
    'Laser_Shoot18.wav',
    'Laser_Shoot22.wav',
    'Laser_Shoot23.wav',
    'Laser_Shoot24.wav',
    'Laser_Shoot25.wav',
    'Pickup_Coin.wav',
    'Pickup_Coin2.wav',
    'Pickup_Coin3.wav',
    'Pickup_Coin4.wav',
    'Pickup_Coin5.wav',
    'Pickup_Coin18.wav',
    'Pickup_Coin19.wav',
    'Pickup_Coin20.wav',
    'Powerup.wav',
    'Powerup11.wav',
    'Powerup12.wav',
    'Powerup13.wav'
  ];

  function addBtnListener(event) {
    event.preventDefault();
    startQ = endQ;
    endQ += Math.floor(Math.random() * 10 + 1);
    if(endQ > totalQ) {
      endQ = totalQ;
    }
    colorIndex++;
    if(colorIndex >= 9) {
      colorIndex = 0;
    }
    processData(questions);
    let nodeList = document.querySelector('section:last-child');
    let height = nodeList.offsetTop;
    window.scrollTo(0, height);

    const audioPath = './assets/audio/';
    const audioIndex = Math.floor(Math.random() * 32); // 0 to 31
    const audio = new Audio(`${audioPath}${audioFiles[audioIndex]}`);
    audio.play();
  }
  function processData(data) {
    let section = document.createElement('section');
    section.classList.add('section');
    section.style.backgroundColor = colors[colorIndex];

    let container = document.createElement('div');
    container.classList.add('container');

    for(let i = startQ; i < endQ; i++){
      let index = i;
      checkType(data[i], index, container);
    }

    section.appendChild(container);
    form.appendChild(section);
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
  function checkType(data, index, container) {
    switch(data.type) {
      case 'multiple':
        addMult(data, index, container);
        break;
      case 'boolean':
        addTrueFalse(data, index, container);
        break;
      case 'open':
      default:
        addOpen(data, index, container);
    }
  }
  function randomizeCorrectAns(array, correctAns){
     let index = Math.floor(Math.random() * (array.length + 1))
     array.splice(index, 0, correctAns);
     return array;
  }
  function addMult(data, index, container) {
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
    container.appendChild(multDiv);
  }
  function addTrueFalse(data, index, container) {
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
    container.appendChild(boolDiv);
  }
  function addOpen(data, index, container) {
    let openDiv = document.createElement('div');
    openDiv.classList.add('div-open');
    let label = document.createElement('label');
    label.classList.add('label-open');
    label.innerHTML = data.question;
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    openDiv.appendChild(label);
    openDiv.appendChild(input);
    container.appendChild(openDiv);
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

