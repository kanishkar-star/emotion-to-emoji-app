prediction_1 = ""
prediction_2 = ""

Webcam.set({
    height:300,
    width:300,
    dest_height : 290,
    dest_width : 320,
    image_format: 'png',
    png_quality:100
});
camera = document.getElementById("camera");

Webcam.attach(camera);

console.log("ml5 Version :" + ml5.version);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>" 
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j5jWQXx5a/model.json', model_loaded)

function model_loaded(){
    console.log("Model Loaded!");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function predict(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, result){
if(error){
    console.error(error);
}
else{
console.log(result);
document.getElementById("result_emotion_name1").innerHTML = result[0].label;
document.getElementById("result_emotion_name2").innerHTML = result[1].label;
prediction_1 = result[0].label;
prediction_2 = result[1].label;
speak();
if( prediction_1 == 'Happy'){
    document.getElementById("update_emoji1").innerHTML = "&#128512;";
}
if(prediction_1 == 'sad'){
    document.getElementById("update_emoji1").innerHTML = "&#128532;";
}
if(prediction_1 == 'angry'){
    document.getElementById("update_emoji1").innerHTML = "&#128545;";
}
if(prediction_2 == 'angry'){
    document.getElementById("update_emoji2").innerHTML = "&#128545;";
}
if(prediction_2 == 'sad'){
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
}
if( prediction_2 == 'Happy'){
    document.getElementById("update_emoji2").innerHTML = "&#128512;";
}
}
}
