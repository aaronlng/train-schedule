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

var dataRef = firebase.database();
var currentTime = moment();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submit").on("click", function() {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrainTime").val().trim();
  frequency = $("#frequency").val().trim();

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");


  dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    time: firstTrain,
    frequency: frequency
  });
});


dataRef.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var time = childSnapshot.val().time;

  var firstTrainConverted = moment(time, "hh:mm").subtract(1, "years");
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  //find the difference between the first train time and the current time

  var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("Difference In Time: " + timeDiff);

  //find the time apart by finding the remainder of the time difference and the frequency - use modal to get whole remainder number

  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);

  //find the minutes until the next train

  var nextTrainMin = frequency - timeRemainder;
  console.log("Minutes Till Train: " + nextTrainMin);

  //find the time of the next train arrival

  var nextTrainAdd = moment().add(nextTrainMin, "minutes");
  var nextTrainArr = moment(nextTrainAdd).format("hh:mm a");
  console.log("Arrival Time: " + nextTrainArr);

  //prepend all information for train data submitted by user

  $("#schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td></tr>");


}, function(err) {
  console.log(err);
});