import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

    //riferimento al input field
    let inputField = document.getElementById('inputField')

    const toggleInputField = () => {
        inputField.classList.toggle('d-none');
    }

    return (
        <header className="py-4">
            <Container className="d-flex align-items-center justify-content-between">
                <Link to={'/'}>
                    <span className="fw-bold">STYLEX</span>
                </Link>
                <div className="d-flex flex-row align-items-center">
                    <input type="text" name="search" className="d-none" placeholder="search product..." id="inputField" />
                    <span className="material-symbols-outlined mx-3" onClick={toggleInputField}>
                        search
                    </span>
                    <Link to={'/favorites'}>
                        <span className="material-symbols-outlined mx-3">
                            favorite
                        </span>
                    </Link>
                    <span className="material-symbols-outlined mx-3">
                        shopping_cart
                    </span>
                    <span className="material-symbols-outlined mx-3">
                        account_circle
                    </span>
                </div>
            </Container>
        </header>
    )
}

export default Header;