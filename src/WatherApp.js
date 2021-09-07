import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './wather.module.css'

const api = {
    key: "96dca52fa3a85e5b88f4f82c33759ce3",
    base: "https://api.openweathermap.org/data/2.5/"
}

function WatherApp() {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = (e) => {
        if (e.key == "Enter") {
            axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                // .then(res => res.json())
                .then(result => {
                    setWeather(result.data)
                    setQuery("")
                    console.log(result);
                })
                .catch(error => {
                    toast.error("data invalid")
                    console.log(error);
                    setQuery("")
                })
        }
    }

    const dataBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()]
        let date = d.getDate()
        let mount = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${mount} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 28) ? `${styles.app} ${styles.warm}` : `${styles.app}`) : `${styles.app}`}>
            <main>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                <div className={styles.locationBox}>
                    {typeof weather.main != "undefined" ? (
                        <div>
                            <div className={styles.location}>{weather.name},{weather.sys.country} </div>
                            <div className={styles.date}>{dataBuilder(new Date())}</div>
                            <div className={styles.weatherBox}>
                                <div className={styles.temp}>{Math.round(weather.main.temp)}°C</div>
                                <div className={styles.weather}>{weather.weather[0].main}</div>
                            </div>
                        </div>
                    ) : ("")}
                </div>
            </main>
        </div>
    )
}


export default WatherApp
