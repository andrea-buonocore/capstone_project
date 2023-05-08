const Product = ({ product }) => {
    return (
        <>
        <div className="m-3 position-relative product_card">
            <div className="d-flex align-items-center justify-content-center position-absolute favorite">
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </div>
            <img src={product.image} alt={product.title} className="object-fit-contain" height={300}/>
        </div>
        <span>$ {product.price}</span>
        </>
    )
}

export default Product;