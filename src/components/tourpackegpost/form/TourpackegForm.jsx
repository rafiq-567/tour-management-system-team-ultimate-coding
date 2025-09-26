import React from 'react';
const TourpackegForm = () => {
    const handleTourPackeg = (e)=>{
        e.preventDefault()
        const form = e.target;
        const title = form.title
        console.log(title)
    }
    return (
        <div>
            <h1>Create tour packeg as you want</h1>
            <form >
                <input type="text" name='title' placeholder='Enter title' />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default TourpackegForm;