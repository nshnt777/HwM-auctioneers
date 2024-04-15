import axios from "axios";
import Header from "../Components/Header";
import { useEffect } from "react";

function Product({prodId}){
    
    // useEffect(()=>{
        // const resp = axios.get('/getProd/:prodId');
        // const prod = resp.data
    // }, [])

    async function resgiserUser(){
        try {
                const resp = await axios.post("http://localhost:3000/api/v1/user/participate", {
                    email: "ns@gmail.com",
                    productId: prodId
                })

                const json = resp.data;

                alert(json.message);
        } catch (error) {
            if (error.response) {
                console.log("Error status:", error.response.status);
                console.log("Error:", error.response.data.message);
                alert(error.response.data.message)
            }
        }
    }

    return(
        <div>
            <Header />
            <div>
                <img src="" alt="prod img"/>
                <h1>Product Title</h1>
                <p>Product desc</p>
                <p>Product ID: {prodId}</p>
            </div>

            <button onClick={resgiserUser}> participate in bidding </button>

            
        </div>
    )
}

export default Product;