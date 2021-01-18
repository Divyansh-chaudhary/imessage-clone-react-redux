import React, {useState, useEffect} from 'react';
import './css/imessage.css';
import SideBar from './components/SideBar';
import Chat from './components/Chat';

export default function IMessage() {
	
	let screenWidth = window.innerWidth;
	const [showMenu, setShowMenu] = useState(true);
	
	useEffect(()=> {
		if(screenWidth <= 630) {
			setShowMenu(false);
		}
	},[]);
	
	return (
		<div className="imessage">
			<SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
			<Chat showMenu={showMenu} setShowMenu={setShowMenu} />
		</div>
	)
}