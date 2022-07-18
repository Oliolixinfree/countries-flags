import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Card } from '../components/Card'
import { Controls } from '../components/Controls'
import { List } from '../components/List'
import { ALL_COUNTRIES } from '../config'

export const HomePage = ({countries, setCountries}) => {
    const [filtredCountries, setFiltredCountries] = useState(countries)

    const handleSearch = (search, region) => {
        let data = [...countries]

        if (region) {
            data = data.filter(c => c.region.includes(region))
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFiltredCountries(data)
    }

    const navigate = useNavigate() 

	// async await????
	useEffect(() => {
        if(!countries.length)
            axios.get(ALL_COUNTRIES).then(
                ({data}) => setCountries(data)
            )
        // eslint-disable-next-line
	},[])

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line
    }, [countries]);

    return (
        <>
            <Controls onSearch={handleSearch} />
            <List>
                {filtredCountries.map(c => {
                    const countryInfo ={
                        img: c.flags.svg,
                        name: c.name,
                        code: c.code,
                        info: [
                            {
                                title: 'Population',
                                description: c.population.toLocaleString()
                            },
                            {
                                title: 'Region',
                                description: c.region
                            },
                            {
                                title: 'Capital',
                                description: c.capital
                            },
                        ],
                    }
                    return (
                        <Card 
                            key={c.name}
                            {...countryInfo}
                            onClick={() => navigate(`/country/${c.name}`)}
                        />
                    )
                })}
            </List>
        </>
    )
}