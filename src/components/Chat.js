import React, {useState, useRef,  useEffect} from 'react';
import '../css/chat.css';
import {useSelector} from 'react-redux'
import { IconButton } from '@material-ui/core'  
import {selectUser} from '../features/userSlice'
import {selectChatName, selectChatId} from '../features/chatSlice'
import Message from './Message'
import firebase from 'firebase'
import {db} from '../firebase.config'
import useOutsideClick from '../customhook/useOutsideClick'
import SendIcon from '@material-ui/icons/Send'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

export default function Chat({setShowMenu, showMenu}) {
	
	const user = useSelector(selectUser);
	const chatName = useSelector(selectChatName);
	const chatId = useSelector(selectChatId);
	const [msg, setMsg]  = useState('');
	const [messages, setMessages] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const ref = useRef();

	useEffect(()=>{
		if(chatId) {
			db.collection('chats')
			.doc(chatId)
			.collection("messages")
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => 
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
		}
	},[chatId]);
	
	useOutsideClick(ref, () => {
		setShowDetail(false);
	});
	
	const sendMsg = (e) => {
		e.preventDefault();
			db.collection('chats').doc(chatId).collection("messages").add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
				message: msg,
				email: user.email,
				displayName: user.displayName,
				photo: user.photo
			});
		setMsg('');
	}
	
	return (
		<div className="chat">
			<div className='chat-header'>
				<IconButton className='menu-btn' onClick={()=> setShowMenu(!showMenu)}>
					<MenuOpenIcon />
				</IconButton>
				<h4>
					To: <span className='chat-name'>{chatName}</span>
				</h4>
				<div ref={ref} className="detail">
					<b onClick={()=>setShowDetail(!showDetail)}>Details</b>
					<div style={{display: showDetail? "block" : "none"}} className="detail-popup">
						<p>Name: {user?.displayName}</p>
						<p>Email: {user?.email}</p>
					</div>
				</div>
				
			</div>
			<div className='chat-messages'>
			{chatId ?
				messages.map(({id, data}) => 
					<Message key={id} content={data} />	
				) :
				""
			}
			</div>
			{
				chatId ? 
				<div className='chat-input'>
					<form>
						<input value={msg} onChange={e => setMsg(e.target.value)} placeholder="iMessage" type='text' />
						<IconButton  type='submit' onClick={sendMsg}>
							<SendIcon />
						</IconButton>
					</form>
				</div> :
				""
			}
		</div>
	)
}