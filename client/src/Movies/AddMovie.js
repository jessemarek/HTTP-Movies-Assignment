import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const AddMovie = props => {

    const {
        setMovieList

    } = props

    const { push } = useHistory()

    const intiialFormValues = {
        title: '',
        director: '',
        metascore: '',
        stars: ''
    }

    /******************************** STATE ********************************/
    const [formValues, setFormValues] = useState(intiialFormValues)


    /****************************** CALLBACKS ******************************/
    const changeHandler = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        const newMovie = {
            ...formValues,
            metascore: Number(formValues.metascore),
            stars: formValues.stars.split(', ')
        }

        axios.post(`http://localhost:5000/api/movies/`, newMovie)
            .then(res => {
                setMovieList(res.data)
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
                        placeholder="Enter as list seperated by commas"
                    />
                </label>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie