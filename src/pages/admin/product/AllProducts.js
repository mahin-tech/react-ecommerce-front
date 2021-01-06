import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getProductByCount, removeProduct } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductByCount(100)
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const handleRemove = (slug) => {
        if (window.confirm("Delete?")) {
            removeProduct(slug, user.token)
                .then(() => {
                    loadAllProducts()
                    toast.error("Product is deleted")
                })
                .catch((err) => {
                    console.log(err)
                    toast.error(err.message)
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                            <h4>All Products</h4>
                        )}
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4 pb-3" key={product._id}>
                                <AdminProductCard product={product} handleRemove={handleRemove} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts