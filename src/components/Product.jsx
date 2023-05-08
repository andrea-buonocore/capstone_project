import { Col, Container } from "react-bootstrap";

const Product = ({ product }) => {
    return (
        <>
            <div className="my-3 position-relative shadow product_card">
                <div className="d-flex align-items-center justify-content-center position-absolute favorite">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </div>
                <img src={product.image} alt={product.title} className="object-fit-contain"/>
            </div>
            
        </>
    )
}

export default Product;