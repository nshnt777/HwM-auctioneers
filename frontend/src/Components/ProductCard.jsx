import './ProductCard.css'
import {useNavigate} from 'react-router-dom'

export default function ProductCard(){
    const navigate = useNavigate();

    function goToProduct(){
        navigate("/product")
    }

    return(
        <div className="card" onClick={goToProduct}>

            <div className='image'>
                <img src="../../public/product.jpg" width={"100px"} alt="prod img"/>
            </div>
            <div className='details'>
                <h3>Product Title</h3>
                <p>Product Description</p>
            </div>
        </div>
    )
}

