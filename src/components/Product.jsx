import { Col } from "react-bootstrap";

const Product = ({ product }) => {
    return (

        <Col className="my-3 position-relative product_container">
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center position-absolute favorite end-0 top-0">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </div>
                <img src={product.image} alt={product.title} className="img-fluid" />
            </div>
        </Col>

    )
}

export default Product;
