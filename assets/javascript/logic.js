$(document).ready(function () {
    //firebase setup
    var config = {
        apiKey: "AIzaSyDfFhx4hv_cjwV8x7Yh9lNUyLLHLoVMO9E",
        authDomain: "trainscheduler-408f7.firebaseapp.com",
        databaseURL: "https://trainscheduler-408f7.firebaseio.com",
        projectId: "trainscheduler-408f7",
        storageBucket: "trainscheduler-408f7.appspot.com",
        messagingSenderId: "94063188683"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var monthsWorkd = "test"
    var totalBilled

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency

        })

        $("#trainName").val("")
        $("#destination").val("")
        $("#firstTrainTime").val("")
        $("#frequency").val("")

    })

    database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
        var sv = snapshot.val();
        var trainName = sv.trainName
        var destination = sv.destination
        var firstTrainTime = sv.firstTrainTime
        var frequency = sv.frequency


        frequency = parseInt(frequency)
        firstTrainTime = parseInt(firstTrainTime)

        var timeRemainder = moment().diff(moment.unix(firstTrainTime), "minutes") % frequency;
        var minAway = frequency - timeRemainder;
        var nextArrival = moment().add(minAway, "m").format("hh:mm A");





        //template literals
        var myTD = `<tr>
        <td>${trainName}</td>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>${nextArrival}</td>
        <td>${minAway}</td>`;

        $("tbody").append(myTD);
    })






});