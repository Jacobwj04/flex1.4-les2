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