import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import axios from 'axios'
import { searchByCountry } from '../config'
import { Button } from '../UI/MyButton'
import { CountryInfo } from '../components/CountryInfo'


export const Details = ({match}) => {
    const {name} = useParams()
    const goBack = useNavigate()
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
    }, [name]);

    return (
        <div>
            <Button onClick={() => goBack('/')}>
                <IoArrowBack /> Back
            </Button>
            {country && (<CountryInfo {...country} />)} 
        </div>
    )
}
