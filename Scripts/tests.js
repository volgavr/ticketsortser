/// <reference path="qunit.js" />
/// <reference path="tripSorter.js" />
test("Types of tickets", function () {
    var a = new TS.TrainTicket(75, "C", "D", "Указывает проводник.");
    var b = new TS.Ticket("D", "E", "bus");
    
    ok(a.hasOwnProperty('seat'), "a.hasOwnProperty('seat')");
    ok(a.start == "C", "a.start == 'C'");
    ok(a.hasOwnProperty('start'), "a.hasOwnProperty('start')");
    ok(b instanceof TS.Ticket, "b instanceof TS.Ticket");
    ok(a instanceof TS.TrainTicket, "a instanceof TS.TrainTicket");
    ok(a instanceof TS.Ticket, "a instanceof TS.Ticket");
    //equal(a.toLocaleString(), "a.toLocaleString()");
});

test("Sort test, mixed types", function () {
    var list = [
        new TS.FlightTicket("SK455", "Gerona Airport", "Stockholm", "3A", 344, "45B"),
        new TS.Ticket("Barcelona", "Gerona Airport", "airport bus"),
        new TS.FlightTicket("SK22", "Stockholm", "New York JFK", "7B", "", 22),
        new TS.TrainTicket("78A", "Madrid", "Barcelona", "45B"),
        new TS.Ticket("Talavera de la Reina", "Madrid", "bus")
    ];

    var exp = [
        new TS.Ticket("Talavera de la Reina", "Madrid", "bus"),
        new TS.TrainTicket("78A", "Madrid", "Barcelona", "45B"),
        new TS.Ticket("Barcelona", "Gerona Airport", "airport bus"),
        new TS.FlightTicket("SK455", "Gerona Airport", "Stockholm", "3A", 344, "45B"),
        new TS.FlightTicket("SK22", "Stockholm", "New York JFK", "7B", "", 22)
    ];
    
    same(list.arrange(), exp, "Number of elements: " + exp.length);
});

test("Sort test, toLocaleString()", function () {
    var list = [
        new TS.FlightTicket("SK455", "Gerona Airport", "Stockholm", "3A", 344, "45B"),
        new TS.Ticket("Barcelona", "Gerona Airport", "airport bus"),
        new TS.FlightTicket("SK22", "Stockholm", "New York JFK", "7B", "", 22),
        new TS.TrainTicket("78A", "Madrid", "Barcelona", "45B"),
        new TS.Ticket("Talavera de la Reina", "Madrid", "bus 416")
    ];

    var exp = [
        "Take the bus 416 from Talavera de la Reina to Madrid. No seat assignment.",
        "Take train 78A from Madrid to Barcelona. Seat 45B.",
        "Take the airport bus from Barcelona to Gerona Airport. No seat assignment.",
        "From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.",
        "From Stockholm, take flight SK22 to New York JFK. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg."
    ];
    
    //для иллюстрации входного массива
    //same(list, list, "Input:")
    
    list.arrange();
    var res = [];
    for (var i = 0; i < list.length; i++) {
        res[i] = list[i].toLocaleString();
    }

    same(res, exp, "After sort and toLocaleString() applying:");
    
});