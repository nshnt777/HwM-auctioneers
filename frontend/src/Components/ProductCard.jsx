import './ProductCard.css'
import {useNavigate} from 'react-router-dom'

export default function ProductCard(){
    const navigate = useNavigate();

    function goToProduct(){
        navigate("/product")
    }

    return(
        <div className="card" onClick={goToProduct}>
            <img src="" alt="Product img"/>
            <h3>Product Title</h3>
            <p>Product Description</p>
        </div>
    )
}

