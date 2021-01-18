import React, {useState, useEffect} from 'react'
import '../css/sidebar.css';
import {Avatar} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {setChat} from '../features/chatSlice'
import {db} from '../firebase.config'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

export default function SideBarChat({name,showMenu, id, setShowMenu}) {
	
	const [chatInfo, setChatInfo] = useState([]);	
	const dispatch = useDispatch();
	const [delChat, setDelChat] = useState(false);
	let date;
	
	useEffect(()=>{
		db.collection("chats").doc(id).collection('messages')
		.orderBy("timestamp", "desc").onSnapshot(snapshot => 
			setChatInfo(snapshot.docs.map(doc => doc.data()))
		);
	},[id]);
	
	const deleteChat = () => {
		const sureDel = window.confirm("Are you sure you want to delete chat");
		if(sureDel) {
			db.collection('chats').doc(id).delete().then(() => {
				dispatch(setChat({
					chatId: null,
					chatName: null
				}))
			}).catch(err => alert(err.message));
		}
		setDelChat(false);
	}
	
	return (
		<div className="sidebar-chat-a">
			<div onClick={()=> {
				dispatch(setChat({
					chatId:id,
					chatName: name,
				}))
			}} className="sidebar-chat">
				<Avatar src={chatInfo[0]?.photo} />
				<div className="sidebar-chat-info">
					<h3>{name}</h3>
					<p>{chatInfo[0]?.message}</p>
					<small>
						{
						(date = new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString())=="Invalid Date"?"":date
						}
					</small>
				</div>
			</div>
			<div className="more-option"  >
				<MoreHorizIcon className="icon" onClick={()=>setDelChat(!delChat)}/>
				<p onClick={deleteChat} className="delete-option" style={{display: delChat? "block": 'none'}}>Delete</p>
			</div>
		</div>
	)
}