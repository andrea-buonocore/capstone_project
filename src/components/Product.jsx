import { Col } from "react-bootstrap";

const Product = ({ product }) => {
    return (

        <Col className="my-3 position-relative product_card">
            <div className="d-flex align-items-center justify-content-center position-absolute favorite">
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </div>
            <img src={product.image} alt={product.title} />
            <span>$ {product.price}</span>
        </Col>

    )
}

export default Product;