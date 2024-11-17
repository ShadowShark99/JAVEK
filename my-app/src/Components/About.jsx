import React from 'react'
import './Styles.css';
const About = () => {
 return (
<div className = "about_card">
<div className = "about_top"> 
<p className='p_about'> D.U.C.K. is a motivational website used to encourage productivity with the power of friendship, communication, and happiness.</p>
</div>
<img src = "https://cdn.pixabay.com/photo/2018/07/08/18/09/mallard-3524390_1280.jpg" alt="duck" className = "picture"/> 
 <p className='p_aboutInfo'> A Duck's opinion is Quack-tastic! We have a built in timer to help you make sanctioned time to be extra productive and take breaks. Set a timer to start! </p>
</div>

)
}

export default About;