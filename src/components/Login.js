import React from 'react'
import '../css/login.css';
import {Button} from '@material-ui/core'
import Logo from '../img/imessages.png'
import {auth, provider} from '../firebase.config'

export default function Login() {
	
	const signIn = () => {
		auth.signInWithPopup(provider).catch(err => alert(err.message));
	}
	
	return (
		<div className="login">
			<div className='logo'>
				<img src={Logo} alt='logo...' />
				<h2>IMessages</h2>
			</div>
			<Button onClick={signIn} className="signin-btn">Sign In</Button>
		</div>
	)
}