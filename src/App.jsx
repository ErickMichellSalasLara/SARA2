import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Elements from './pages/Elements'
import Generic from './pages/Generic'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generic" element={<Generic />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
