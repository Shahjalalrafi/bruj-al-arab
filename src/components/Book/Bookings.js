import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Bookings = () => {

    const [newBookings, setNewBookings] = useState([])

    const [logedinUser, setLogedInUser] = useContext(userContext)

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+logedinUser.email, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${sessionStorage.getItem('token')}` 
            }
        })
            .then(res => res.json())
            .then(data => {
                setNewBookings(data)
            })
    }, [])


    // useEffect(() => {
    //     fetch(`http://localhost:5050/bookings?email=`+ logedinUser.email)
    //     .then(res => res.json())
    //     .then( data => setNewBookings(data))
    // }, [])


    return (
        <div>
            <h2>new Bookings of: {newBookings.length}</h2>
            {
                newBookings.map(bookings => <li>{bookings.name} checkIn: {new Date(bookings.checkIn).toDateString('dd/mm/yyyy')} checkOut: {bookings.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;