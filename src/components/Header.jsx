import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

    window.onscroll = function () {
        let header = document.getElementsByTagName('header')[0];

        if (window.scrollY > 50) {
            header.classList.add('scrolled_header');
        } else {
            header.classList.remove('scrolled_header');
        }
    }


    //riferimento all'input field
    const inputField = document.getElementById('inputField')

    const toggleInputField = () => {
        inputField.classList.toggle('d-none')
    }

    return (
        <header className="py-4 fixed-top">
            <Container className="d-flex align-items-center justify-content-between">
                <Link to={'/'}>
                    <span className="fw-light">styleX</span>
                </Link>
                <div className="d-none d-md-inline-block d-flex flex-row align-items-center">
                    <span className="material-symbols-outlined mx-3" onClick={toggleInputField}>
                        search
                    </span>
                    <input type="text" name="search" className="d-none" placeholder="search product..." id="inputField" />
                    <Link to={'/favorites'} style={{ padding: 0 }}>
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