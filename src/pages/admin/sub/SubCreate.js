import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import { createSub, getSub, removeSub, getSubs } from '../../../functions/sub'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [subs, setSubs] = useState([])

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data))


    const loadSubs = () =>
        getSubs().then((s) => setSubs(s.data))


    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false)
                setName("")
                toast.success('Sub category is created')
                loadSubs()
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Deleted?")) {
            setLoading(true)
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.error('Sub category deleted')
                    loadSubs()
                })
                .catch((err) => {
                    setLoading(false)
                    toast.error(err.message)
                })
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">loading...</h4>
                    ) : (
                            <h4>Create Sub Category</h4>
                        )}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please Select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        setName={setName}
                        name={name}
                    />

                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    <hr />
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                                <DeleteOutlined className="text-warning" />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubCreate