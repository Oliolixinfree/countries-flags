import axios from 'axios'
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { Card } from '../components/Card'
import { Controls } from '../components/Controls'
import { List } from '../components/List'
import { ALL_COUNTRIES } from '../config'

export const HomePage = ({countries, setCountries}) => {
    const navigate = useNavigate() 

	// async await????
	useEffect(() => {
        if(!countries.length)
            axios.get(ALL_COUNTRIES).then(
                ({data}) => setCountries(data)
            )
	},[])

    return (
        <>
            <Controls />
				<List>
					{
						countries.map(c => {
							const countryInfo ={
								img: c.flags.png,
								name: c.name.common,
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
                                    key={c.name.common}
                                    {...countryInfo}
                                    onClick={() => navigate(`/country/${c.name.common}`)}
                                />
							)
						})
					}
				</List>
        </>
    )
}
