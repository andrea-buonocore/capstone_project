import { Container } from "react-bootstrap";

const Header = () => {
    return (
        <header className="py-5 fixed-top">
            <Container className="d-flex align-items-center justify-content-between">
                <span>StyleX</span>
                <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined mx-3">
                        search
                    </span>
                    <span className="material-symbols-outlined mx-3">
                        favorite
                    </span>
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