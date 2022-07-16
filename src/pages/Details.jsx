import React from 'react'
import {useParams} from 'react-router-dom'

export const Details = ({match}) => {
    const {name} = useParams()
    console.log(match)
    return (
        <div>Details {name}</div>
    )
}
