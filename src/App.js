import React,  {useEffect} from 'react';
import IMessage from './IMessage';
import './css/app.css';
import {selectUser, login, logout} from './features/userSlice'
import {useSelector , useDispatch} from 'react-redux'
import Login from './components/Login'
import {auth} from './firebase.config'

export default function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if(authUser) {
				dispatch(login({
					uid: authUser.uid,
					email: authUser.email,
					displayName: authUser.displayName,
					photo: authUser.photoURL,
				}));
			} else {
				dispatch(logout());
			}
		})
	},[]);
	return(
		<div className="app">
			{user ? <IMessage /> : <Login /> }
		</div>
	)
}