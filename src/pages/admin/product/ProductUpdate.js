import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../functions/product'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
    title: "",
    description: "",
    price: "",
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

const ProductUpdate = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories] = useState([])
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const { slug } = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            setValues({ ...values, ...p.data })
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data)
            })
            let arr = []
            p.data.subs.map((s) => {
                arr.push(s._id)
            })
            setArrayOfSubs((prev) => arr)
        })
    }

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data))


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success("Product is updated")
                history.push("/admin/products")
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({ ...values, subs: [] })

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data)
        })
        if (values.category._id === e.target.value) {
            loadProduct()
        }
        setArrayOfSubs([])
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
                            <h4>Product Update</h4>
                        )}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate