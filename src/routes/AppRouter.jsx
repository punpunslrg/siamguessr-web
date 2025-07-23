import {Route, Routes} from 'react-router'
import Home from '../pages/Home'
import Layout from '../layouts/Layout'
import Gameplay from '../pages/Gameplay'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='gameplay' element={<Gameplay />} />
      </Route>
    </Routes>
  )
}
export default AppRouter