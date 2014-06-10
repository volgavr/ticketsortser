/**
 * tripSorter - A JavaScript Module
 *
 * Copyright (c) 2014 Vladimir Gavrilov
 */
/**
* Билет, карточка путешественника
* Ticket {
    start - пункт отправления (строка),
    end - пункт назначения (строка),
    transport - транспорт (строка), например: автобус 416
} 
*/

(function () {
    this.TS = this.TS || {};
    var ns = this.TS;
    /** Constructor.
      * @param startPoint string
      * @param endPoint string
      * @param transport string
      */
    ns.Ticket = function (from, to, transport) {
        this.start = from;
        this.end = to;
        this.transport = transport ? transport : 'transport';
    };

    ns.Ticket.prototype.toLocaleString = function () {
        return 'Take the ' + this.transport + ' from ' + this.start + ' to ' + this.end + '. No seat assignment.';
    };

/**
      * Arranges an array of Ticket objects, browsing 'start' and 'end' props.
      * @param pos1 int
      * @param pos2 int
      */
Array.prototype.arrange = function () {
    var a = this,
        k = 1;
    
    while (k < a.length) {
        
        for (var i = k; i < a.length; i++) {
            if (a[i].start == a[k-1].end) {
                a.move(i, k);
                k++;
            }

            if (a[i].end == a[0].start) {
                a.move(i, 0);
                k++;

            }

        }

    }

    return a;
}

//ancillary method for moving an element from one pos. to another
//Array.prototype.move = function (from, to) {
//    this.splice(to, 0, this.splice(from, 1)[0]);
//};

/**
  * Moves an element from pos1 to pos2 within the array.
  * @param pos1 int
  * @param pos2 int
  */
Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i+1];
            }
        }
            // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i-1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}

})();

//TS.TrainTicket = function (start, end, number, seat) {
//    TS.Ticket.call(this, start, end);
//    this.number = number;
//    this.seat = seat;
//};
//TS.TrainTicket.prototype.toLocaleString = function () {
//    return 'Take train ' + this.number + ' from ' + this.start + ' to ' + this.end + '. Seat ' + this.seat;
//}

/**
*   Добавляем билет на поезд (TrainTicket), наследуемся от Ticket
*/

TS.TrainTicket = (function (parent) {
    trainTicket.prototype = new TS.Ticket();
    trainTicket.prototype.constructor = trainTicket;

    /** Constructor.
      * @param number string
      * @param from string
      * @param to string
      * @param seat string
      */
    function trainTicket(number, from, to, seat) {
        parent.call(this, from, to);
        this.number = number;
        this.seat = seat;
    }

    trainTicket.prototype.toLocaleString = function () {
        return 'Take train ' + this.number + ' from ' + this.start + ' to ' + this.end + '. Seat ' + this.seat + '.';
    }

    return trainTicket;
})(TS.Ticket);

/**
*   Добавляем билет на самолет (FlightTicket), наследуемся от Ticket
*/
TS.FlightTicket = (function (parent) {
    flightTicket.prototype = new TS.Ticket();
    flightTicket.prototype.constructor = flightTicket;

    /** Constructor.
      * @param number string
      * @param from string
      * @param to string
      * @param seat string
      * @param buggageDropOff string
      * @param gate string
      */
    function flightTicket(number, from, to, seat, buggageDropOff, gate) {
        parent.call(this, from, to);
        this.number = number;
        this.seat = seat;
        this.buggageDropOff = buggageDropOff;
        this.gate = gate;
    }

    flightTicket.prototype.toLocaleString = function () {
        return ('From ' + this.start + ', take flight ' + this.number + ' to ' + this.end + '.'
            + (this.gate ? ' Gate ' + this.gate + '.' : '')
            + ' Seat ' + this.seat + '.'
            + (this.buggageDropOff ? ' Baggage drop at ticket counter ' + this.buggageDropOff + '.' : ' Baggage will be automatically transferred from your last leg.')
        );
    };

    return flightTicket;
})(TS.Ticket);