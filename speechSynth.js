
let inputTxt = document.querySelector('#textInput');
let play = document.querySelector('#play');
let play2 = document.querySelector('#play2');
let play3 = document.querySelector('#play3');
let play4 = document.querySelector('#play4');

play.addEventListener('click', () => {sayTheWord(inputTxt.value);});
play2.addEventListener('click', () => { sayTheWord(textArray[0]); });
play3.addEventListener('click', () => { sayTheWord(textArray[1]); });
 
let synthesizer =  window.speechSynthesis; // init speech synthesizer
let magicVoice = new SpeechSynthesisUtterance(); // instance of speech to text

// text to speech
function sayTheWord(theseWords){
    console.log(theseWords);
    synthesizer.cancel(); // reset de speech synthesizer
    magicVoice.voice = synthesizer.getVoices()[16]; // language selection dutch
    //magicVoice.voice = synthesizer.getVoices()[0]; // language selection english
    magicVoice.pitch = 0.5; // toonhoogte
    magicVoice.rate = 0.8; // speed
    magicVoice.text = theseWords; // say it    
    synthesizer.speak(magicVoice);
}

const textArray = ['Welkom bij UJ wat wilt', 'Nike, Addidas en Puma'];

class TextData{
    dateStringDutch(){
        let date = new Date();
        let dayName = [ 'Zondag','Maandag','Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag',  'Zaterdag'];
        let monthName = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
        let dateString = dayName[date.getDay()] + " " + date.getMonth()  + " " + monthName[date.getMonth()]  + " " + date.getHours() + " "+ " uur "+ date.getMinutes() ;
        console.log(dateString); // debug
        return(dateString);
    }
    dateStringEnglish(){
        let date = new Date();
        let dayName = [ 'Sunday','Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday',  'Saturday'];
        let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dateString = dayName[date.getDay()] + " " + monthName[date.getMonth()] + " " + date.getMonth() + " time " + date.getHours() +" hours "+ date.getMinutes() + " minutes ";
        console.log(dateString); // debug
        return(dateString);
    }
    welcomeEn(){
        let textString = ("Welcome to my shop! How can I help you");
        return textString;
    }
    welcomeDu(){
        let textString = ("Welkom bij mijn webwinkel. Hoe kan ik jou helpen");
        return textString;
    }
}
textData = new TextData; // maak een instance van de class


console.log(synthesizer.getVoices()); // show available languages in console


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const textInput = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
  if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
    console.log("started");
    let recognition = new SpeechRecognition();  
    recognition.lang = 'en-US'; // which language is used?
    recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
    recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   
    recognition.onstart = () => {
      textInput.innerHTML = `Starting listening, speak in the microphone please<br>Say "help me" for help`;
      output.classList.add("hide"); // hide the output
    };

    recognition.onspeechend = () => {
      textInput.innerHTML = `I stopped listening `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
      let transcript = result.results[0][0].transcript;
      let confidenceTranscript= Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
      output.classList.remove("hide"); // show the output
      output.innerHTML = `I'm ${confidenceTranscript}% certain you just said: <b>${transcript}</b>`;
      actionSpeech(transcript);
    };

    recognition.start();
  } 
  else {  // speechrecognition is not supported
    textInput.innerHTML = "sorry speech to text is not supported in this browser";
  }
};

// process speech results
actionSpeech = (speechText) => {
  speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
  console.log(speechText); // debug 
  switch(speechText){ 
    // switch evaluates using stric comparison, ===
    case "black":
      document.body.style.background = "#000000";
      document.body.style.color="#FFFFFF";
      break;
    case  "reset":
      document.body.style.background = "#ffe6ab";
      document.body.style.color="#000000";
      image1.classList.add("hide"); // hide image (if any)
      break;
    case "jacob": // let op, "fall-through"
    case "image": // let op, "fall-through"
      image1.src = "img/live.jpg";
      image1.style.width = "400px";
      image1.classList.remove("hide") // show image
      break;
      case "next page":
      window.open("http://32894.hosts1.ma-cloud.nl/f1m2js/Bo-webshop-UJ/", "_self");
      break;
    case "help me":
      alert("Valid speech commands: black,  reset, next page");
      break;
    default:
      window.open("https://www.google.com/search?q=" + speechText);
      //do nothing yet
  }
}