import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useDocument } from './hooks/useDocument';
import { useAuthContext } from './hooks/useAuthContext';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import OnlineUsers from './components/OnlineUsers/OnlineUsers';

import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Settings from './pages/settings/Settings';

import { PrivateRouter } from './utils/PrivateRouter';
import { PublicRouter } from './utils/PublicRouter';

import './App.css';

function App() {
	const { authIsReady, user, theme } = useAuthContext();
	const { documents } = useDocument('users')

	console.log(documents)	
	return (
		<div className={'App '+ theme}>
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className="container">
						<Navbar user={user} theme={theme} />
						<Routes>
							<Route element={<PrivateRouter user={user} />}>
								<Route path="/" element={<Dashboard />} />
								<Route path="/create" element={<Create />} />
								<Route path="/project/:id" element={<Project />} />
								<Route path="/settings" element={<Settings />} />
							</Route>
							<Route element={<PublicRouter user={user} />}>
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
							</Route>
						</Routes>
					</div>
					{user && <OnlineUsers />}
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
