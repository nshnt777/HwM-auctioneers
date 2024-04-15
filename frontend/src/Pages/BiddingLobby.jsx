import './Bidding.css'
import Header from "../Components/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';

function BiddingLobby({prodId}){
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [myBid, setMyBid] = useState();
    const [currentBid, setCurrentBid] = useState(10);
    const [flag, setFlag] = useState(false);

    async function placeBid(e){
        try {
            e.preventDefault();
            if(myBid > currentBid){
                const resp = await axios.post('/placebid', {
                    newBid: myBid
                })

                if(resp.data){
                    const newHighestBid = resp.data.newCurrentBid;
                    setCurrentBid(newHighestBid);
                    setMinutes(2);
                    setSeconds(0);
                }
            }
            else{
                setFlag(true)
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    }

    useEffect(()=>{

        let timerId = setInterval(() => {
            if(seconds === 0){
                if(minutes === 0){
                    clearInterval(timerId);
                    // alert("Time up! Auction has ended")
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
                                setMyBid(e.target.value);
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