import React from 'react'
import '../css/message.css';
import {Avatar} from '@material-ui/core'
import {selectUser} from '../features/userSlice'
import {useSelector} from 'react-redux'

export default function Message({id, content:{
	uid, message, photo, displayName, timestamp, email
}}) {
	
	const user = useSelector(selectUser);
		
	return (
		<div className={`message ${user.email == email && 'message-sender'}`}>
			<Avatar className="message-photo" src={photo} />
			<p>{message}</p>
			<small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
		</div>
	)
}