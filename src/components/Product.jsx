const Product = ({ product }) => {
    return (
        <div className="mx-3 position-relative product_card d-inline-block">
            <div className="d-flex align-items-center justify-content-center position-absolute favorite">
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </div>
            <img src={product.image} alt={product.title} className="object-fit-contain" height={300}/>
        </div>
    )
}

export default Product;