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
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={'/home'}>
                        <span className="fw-bold">styleX</span>
                    </Link>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="d-inline-block mx-3 d-flex align-items-center">
                            <Link to={'/favorites'}>
                                <span className="d-inline block material-symbols-outlined mx-1">
                                    favorite
                                </span>
                            </Link>
                            <span className="d-inline block">{favoritesItems === 0 ? null : favoritesItems}</span>
                        </div>
                        <div className="d-inline mx-3 d-flex align-items-center">
                            <Link to={'/cart'}>
                                <span className="d-inline-block material-symbols-outlined mx-1">
                                    shopping_cart
                                </span>
                            </Link>
                            <span className="d-inline-block">{cartItems === 0 ? null : cartItems}</span>
                        </div>
                        <div className="d-inline mx-3">
                            <Link to={'/profile'}>
                                <span className="material-symbols-outlined">
                                    account_circle
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </header >
    )
}

export default Header;