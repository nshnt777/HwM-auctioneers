import './Bidding.css'
import Header from "../Components/Header";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
// import axios from 'axios';


function BiddingLobby({prodId}){

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [myBid, setMyBid] = useState();
    const [currentBid, setCurrentBid] = useState(10);
    const [flag, setFlag] = useState(false);

    let socket;


    useEffect(()=>{
        socket = io('http://localhost:3000/api/v1/auction/lobby');

        socket.on('connect', ()=>{
            console.log("Connected to server Successfully")
        })

        socket.on('updateCurrentBid', (data) => {
            console.log("New current bid:", data.newCurrentBid)
            setCurrentBid(data.newCurrentBid);
        });

        socket.on('event-start', ({timerSeconds})=>{
            let min = Math.floor(timerSeconds/60);
            let sec = timerSeconds - (minutes*60);

            setMinutes(min);
            setSeconds(sec);
            console.log("Event started")
        })
        
        socket.on('timerUpdate', (timerValue)=>{
            let min = Math.floor(timerSeconds/60);
            let sec = timerSeconds - (minutes*60);

            setMinutes(min);
            setSeconds(sec);
        })

        socket.on('resetTimer', ({ minutes, seconds }) => {
            setMinutes(minutes);
            setSeconds(seconds);
        });

        socket.on('time-up', ({message})=>{
            alert(message);
        })

        return ()=>{
            socket.off('resetTimer');
            socket.off('updateCurrentBid');
            socket.disconnect();
        }
    }, [])

    useEffect(()=>{

        let timerId = setInterval(() => {
            if(seconds === 0){
                if(minutes === 0){
                    clearInterval(timerId);
                    alert("Time up! Auction has ended")
                }
                else{
                    setMinutes((prev)=>{
                        return prev-1
                    });
                    setSeconds(59);
                }
            }
            else if (seconds > 0){
                setSeconds((prev)=>{
                    return prev-1
                });
            }
        }, 1000);

        return ()=>{
            clearInterval(timerId);
        }
    }, [minutes, seconds])

    async function placeBid(e){
        try {
            e.preventDefault();
            if(myBid > currentBid){
                socket = io('http://localhost:3000/api/v1/auction/lobby');
                socket.emit('placeBid', { newBid: myBid });
                socket.on('updateCurrentBid', (data) => {
                    console.log("New current bid:", data.newCurrentBid)
                    setCurrentBid(data.newCurrentBid);
                });
                // socket.emit('resetTimer');
                setMinutes(2);
                setSeconds(0);
                setCurrentBid(myBid);
                setFlag(false);
            }
            else{
                setFlag(true)
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    }

    return(
        <div>
            <Header />

            <div>
                <div className='bid-container'>
                    <div>
                        <div>
                            Auction of product (Product ID: {prodId})
                        </div>
                        <img className='product-image' src="../../public/product.jpg" alt="product photo" />
                    </div>

                    <div className='bid-details'>
                        <div className='current-bid'>
                            Current Highest Bid: {currentBid}
                        </div>

                        <div className='remaining-time'>
                            Time remaining: <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                        </div>

                        <form className='new-bid'>
                            <input type="number" placeholder='Enter your Bid'
                            onChange={(e)=>{
                                setMyBid(parseInt(e.target.value));
                            }}/>
                            <button type='submit' onClick={(e)=>{placeBid(e)}}>Submit</button>
                        </form>
                        <div>
                            {flag && <span>Bid should be higher than current bid</span>}
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default BiddingLobby;