import './Header.css';

function Header(){
    return(
        <div className='header'>
            <header>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Register as expert</li>
                        <li>Sell product</li>
                    </ul>
                </nav>

                <form>
                    <input type="search" placeholder="Search for products" />
                </form>
            </header>
        </div>
    )
}

export default Header