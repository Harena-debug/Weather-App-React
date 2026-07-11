import logo from '../assets/images/logo.svg'
import { useState } from 'react'
import '../styles/Header.css'

const Header = ({unit , setUnit}) => {
    const [isOpen , setIsOpen] = useState(false);
    const temperature = ['Celcius (°C)' , 'Fahrenheit (°F)'];
    const wind = ['km/h' , 'mph'];
    const precipitation = ['Millimeters (mm)' , 'Inches (in)'];
    return (
        <section className='header'>
            <section className='header__left'>
                <img src={logo} alt="Weather logo" className='logo'/>
            </section>
            <section className='header__right'>
                <button className='unit' onClick={() => {
                    isOpen ? setIsOpen(false) : setIsOpen(true)
                }}>Units</button>
                <section className={isOpen ? 'header__data showData' : 'header__data'}>
                    <button className='switch' onClick={() => {
                        unit === 'Metric' ? setUnit('Imperial') : setUnit('Metric')
                    }}>{`Switch to ${unit}`}</button>
                    <section className="header__temperature__data">
                        <h4 className='temperature__title'>Temperature</h4>
                        {temperature.map((value , index) => (
                            <label key={value} className={index % 2 === 0 ? (unit === 'Imperial' ? 'showUnit' : '') : index % 2 !== 0 ? (unit === 'Metric' ? 'showUnit' : '') : ''}>
                                <input
                                type="radio"
                                name='temperature'
                                value={value} 
                                />
                                {value}
                            </label>
                        ))}
                    </section>
                    <section className='header__wind__data'>
                        <h4 className="wind__title">Wind speed</h4>
                        {wind.map((value , index) => (
                            <label key={value} className={index % 2 === 0 ? (unit === 'Imperial' ? 'showUnit' : '') : index % 2 !== 0 ? (unit === 'Metric' ? 'showUnit' : '') : ''}>
                                <input
                                type="radio"
                                value={value}
                                name='wind' 
                                />
                                {value}
                            </label>
                        ))}
                    </section>
                    <section className='header__precipitation__data'>
                        <h4 className="precipitation__title">Precipitation</h4>
                        {precipitation.map((value , index) => (
                            <label key={value} className={index % 2 === 0 ? (unit === 'Imperial' ? 'showUnit' : '') : index % 2 !== 0 ? (unit === 'Metric' ? 'showUnit' : '') : ''}>
                                <input
                                type="radio"
                                value={value}
                                name='precipitation'
                                />
                                {value}
                            </label>
                        ))}
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Header;