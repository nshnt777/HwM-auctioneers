import './Product.css'
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

            <div className='container'>
                <div className='product-image'>
                    <img src="../../public/product.jpg" alt="prod img"/>
                </div>

                <div className='product-info'>
                    <h1>Product Title</h1>
                    <p>Deatiled Product description</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error ad et quisquam perferendis officia voluptates earum doloremque voluptatem omnis nemo atque fugit laboriosam accusamus, culpa eveniet esse corrupti tempore distinctio.</p>
                    <p>Product ID: {prodId}</p>
                    <button onClick={resgiserUser}> participate in bidding </button>
                </div>
            </div>
        </div>
    )
}

export default Product;