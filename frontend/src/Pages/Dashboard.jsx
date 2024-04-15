import './Dashboard.css'
import Header from "../Components/Header.jsx";
import ProductCard from "../Components/ProductCard.jsx";

function Dashboard(){
    return(
        <>
            <Header />
            <div className="product-screen">
                <ProductCard />
                <ProductCard />
            </div>
        </>
    )
}

export default Dashboard;