import React, {useState,useEffect} from 'react'
import '../css/sidebar.css';
import {Avatar,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SideBarChat from './SideBarChat';
import {selectUser} from '../features/userSlice'
import {useSelector } from 'react-redux'
import {auth,db} from '../firebase.config'

export default function SideBar({showMenu, setShowMenu}) {
	
	const [chats, setChats] = useState([]);
	const user = useSelector(selectUser);
	const [searchInput, setSearchInput] = useState();
	
	useEffect(()=>{
		db.collection('chats').onSnapshot((snapshot) => 
			setChats(snapshot.docs.map((doc) => ({
				id:doc.id,
				data:doc.data()
			})))
	)},[]);
	
	const addChat = () => {
		const chatName = prompt("Enter new chat name");
		if(chatName) {
			db.collection("chats").add({
				chatName: chatName
			});
		}	
	}
	
	return (
		<div className="sidebar" style={{display: showMenu ? "block" : "none"}}>
			<div className="sidebar-header">
				<Avatar src={user.photo} title={`Logout ${user.displayName}`} onClick={()=> auth.signOut()} className='sidebar-avatar' />
				<div className="sidebar-input">
					<SearchIcon />
					<input 
						onChange={e => setSearchInput(e.target.value)} 
						placeholder='search name...' 
					/>
				</div>
				<IconButton  onClick={addChat} variant='outlined' className='sidebar-input-button'>
					<RateReviewOutlinedIcon className="add-chat" />
				</IconButton>
			</div>
			<div className="sidebar-chats">
				{chats.map(chat => {
					if(chat.data.chatName.search(searchInput) != '-1') {
						return (<SideBarChat 
							showMenu={showMenu}
							setShowMenu={setShowMenu}
							name={chat.data.chatName} 
							id={chat.id} 
							key={chat.id} 
						/>)
					}
				})}
			</div>
		</div>
	)
}