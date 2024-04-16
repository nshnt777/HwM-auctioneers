let currentBid = 10;
// let timer = null;

function auctionSockets(io){
    // function runTimer(){
    //     timer = setInterval(() => {
    //         io.emit('time-up', {message: "Time is up"});
    //         clearInterval(timer);
    //     }, 2000);
    // }
    let timerID = null;
    let timerValue = 0;
    const duration = 120;

    const startTime = new Date(2024, 3, 16, 13, 25, 0, 0);
    const now = new Date();
    const delay = startTime - now;

    console.log(startTime);
    console.log(now);
    console.log(delay);

    if(delay > 0){
        setTimeout(startTimer, delay);
        console.log("Started countdown to event start");
    }
    else if (delay <= 0){
        io.emit('time-up', {message: "Time is up"});
        console.log("Event already over");
    }

    function startTimer() {
        console.log("Event started")
        io.emit('event-start', {timerSeconds: timerValue})

        timerID = setInterval(() => {
            timerValue++;
            if (timerValue === duration) {
                stopTimer();
            }
            io.emit('timerUpdate', timerValue);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerID);
    }

    io.of('/api/v1/auction/lobby').on('connection', (socket)=>{
        console.log("Client connected", socket.id);
        io.emit('currentBid', currentBid);
        io.emit('resetTimer', { minutes: 2, seconds: 0 });
        // runTimer();

        socket.on('placeBid', ({newBid})=>{
            newBid = parseInt(newBid);
            console.log("Recieved bid: " , newBid);
            console.log("curent bid: " , currentBid);

            if(newBid > currentBid){
                console.log("run")
                currentBid = newBid;
                io.emit('updateCurrentBid', {newCurrentBid: currentBid});
                io.emit('resetTimer', { minutes: 2, seconds: 0 });
            }
            else if(newBid <= currentBid){
                console.log("rejected")
                socket.emit('bidRejected');
            }
        })

        // socket.on('resetTimer', () => {
        //     clearTimeout(timer);
        //     startTimer();
        // });

        socket.on('disconnect', ()=>{
            console.log("user disconnected");
        })
    });

}

export default auctionSockets;