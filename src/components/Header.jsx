import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from "react";

const Header = () => {

    const [cartItems, setCartItems] = useState(0);
    const [favoritesItems, setFavoritesItems] = useState(0);

    const USER_URL = `http://localhost:3030/users/${localStorage.getItem('userID')}`;

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

    const getCartItems = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let user = await res.json();
                let cart = user.cart.length;
                setCartItems(cart);
            }
            else {
                return new Error(res.statusText);
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    const getFavoritesItems = async () => {
        try {
            let res = await fetch(USER_URL);
            if (res.ok) {
                let user = await res.json();
                let favorites = user.favorites.length;
                setFavoritesItems(favorites);
            }
            else {
                return new Error(res.statusText);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getFavoritesItems();
        getCartItems();
    }, [])

    return (
        <header className="py-4 fixed-top">
            <Container className="d-flex align-items-center justify-content-between">
                <Link to={'/home'}>
                    <span className="fw-bold">styleX</span>
                </Link>
                <div className="d-none d-md-inline-block d-flex flex-row align-items-center">
                    <span className="material-symbols-outlined mx-3" onClick={toggleInputField}>
                        search
                    </span>
                    <input type="text" name="search" className="d-none" placeholder="search product..." id="inputField" />
                    <Link to={'/favorites'} style={{ padding: 0 }}>
                        <div className="d-inline-block position-relative mx-3">
                            <span className="material-symbols-outlined">
                                favorite
                            </span>

                            <span className="position-absolute mx-1">{favoritesItems === 0 ? null : favoritesItems}</span>
                        </div>
                    </Link>
                    <Link to={'/cart'}>
                        <div className="d-inline-block position-relative mx-3">
                            <span className="material-symbols-outlined">
                                shopping_cart
                            </span>
                            <span className="position-absolute mx-1">{cartItems === 0 ? null : cartItems}</span>
                        </div>
                    </Link>
                    <Link to={'/profile'}>
                        <span className="material-symbols-outlined mx-3">
                            account_circle
                        </span>
                    </Link>
                </div>
            </Container>
        </header >
    )
}

export default Header;