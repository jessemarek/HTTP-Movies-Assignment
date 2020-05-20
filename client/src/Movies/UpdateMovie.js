import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateMovie = props => {

    const {
        movieList,
        setMovieList

    } = props

    const { id } = useParams()

    const { push } = useHistory()

    const intiialFormValues = {
        title: '',
        director: '',
        metascore: '',
        stars: ''
    }

    /******************************** STATE ********************************/
    const [formValues, setFormValues] = useState(intiialFormValues)


    /***************************** SIDE EFFECTS *****************************/
    useEffect(() => {

        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setFormValues({
                    ...res.data,
                    stars: res.data.stars.join(', ')
                })
            })
            .catch(err => console.log(err))

    }, [id])


    /****************************** CALLBACKS ******************************/
    const changeHandler = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        const updatedMovie = {
            ...formValues,
            metascore: Number(formValues.metascore),
            stars: formValues.stars.split(', ')
        }

        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => {
                console.log(res)
                setMovieList(movieList.map(m => m.id !== id ? m : res.data))
                push('/')
            })
            .catch(err => console.log(err))
    }

    /********************************* JSX *********************************/
    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <label>Title:
                    <input
                        name="title"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.title}
                    />
                </label>
                <label>Director:
                    <input
                        name="director"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.director}
                    />
                </label>
                <label>Metascore:
                    <input
                        name="metascore"
                        type="number"
                        onChange={changeHandler}
                        value={formValues.metascore}
                    />
                </label>
                <label>Stars:
                    <textarea
                        name="stars"
                        onChange={changeHandler}
                        value={formValues.stars}
                        placeholder="Enter stars in list seperated by commas"
                    />
                </label>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie