// Initialize Firebase
var config = {
  apiKey: "AIzaSyBl564tKFV0-3j-UeoDc8dahx1jdcNDeyo",
  authDomain: "train-schedule-f21f3.firebaseapp.com",
  databaseURL: "https://train-schedule-f21f3.firebaseio.com",
  projectId: "train-schedule-f21f3",
  storageBucket: "train-schedule-f21f3.appspot.com",
  messagingSenderId: "188592854857"
};
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submit").on("click", function () {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();

  firebase.database().ref().set({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  })
})

firebase.database().ref().on("value", function(snapshot){
  $("#trainName").html(snapshot.val().trainName);
  $("#destination").html(snapshot.val().destination);
  $("#firsTrainTime").html(snapshot.val().firstTrain);
  $("#frequency").html(snapshot.val().frequency);
})