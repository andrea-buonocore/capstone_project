import { Container } from "react-bootstrap";

const Header = () => {

    //riferimento al input field
    let inputField = document.getElementById('inputField')
    console.log(inputField);

    const toggleInputField = () => {
        inputField.classList.toggle('d-none');
    }

    return (
        <header className="py-4 fixed-top">
            <Container className="d-flex align-items-center justify-content-between">
                <span className="fw-bold">STYLEX</span>
                <div className="d-flex align-items-center">
                    <input type="text" name="search" placeholder="search product..." id="inputField"/>
                    <span className="material-symbols-outlined mx-3" onClick={toggleInputField}>
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