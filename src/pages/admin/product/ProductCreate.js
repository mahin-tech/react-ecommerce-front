import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: ""
}

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSub] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }))


    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then((res) => {
                console.log(res)
                toast.success('Product is created')
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data)
        })
        setShowSub(true)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger" />
                    ) : (
                            <h4>Product Create</h4>
                        )}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate