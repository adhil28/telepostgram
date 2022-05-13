import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Auth from './Components/Auth/Auth'
import { isSignedIn } from './Helpers/LoginHelper'
import Home from './Components/Home/Home'
import env from './react-app-env.d'
import { Telegram } from './Helpers/Telegram'
import config from './Helpers/Global'
import Splash from './Components/Splash/Splash'
import Profile from './Components/Home/Profile/Profile'
function App() {
    const nav = useNavigate()

    const [configured, setConfigured] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (!configured) {
            let path = location.pathname.replaceAll('/', 'SPLIT_KEYWORD_CONST')
            if (path !== 'SPLIT_KEYWORD_CONST') {
                if (path !== 'SPLIT_KEYWORD_CONSTauth') {
                    nav('/')
                }
            }
        }
    }, [location]);

    useEffect(() => {
        isSignedIn().then(async (result) => {
            if (!result) { nav('/auth') }
            else {
                const apiId: string | undefined = env.REACT_APP_API_ID
                const apiHash: string | undefined = env.REACT_APP_API_HASH
                const stringSession: string = result
                if (apiId != null && apiHash != null && stringSession != null) {
                    let telegram = new Telegram({ apiHash: apiHash, apiId: parseInt(apiId), stringSession: stringSession })
                    await telegram.setUpDatabase()
                    config.telegram = telegram
                    setConfigured(true)
                    setTimeout(() => {
                        nav('/home')
                    }, 500);
                } else {
                    nav('/auth')
                }
            }
        })
    }, [])

    return (
        <div>
            <Routes>
                <Route path='/' element={<Splash />} />
                <Route path='/home' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </div>
    )
}

export default App