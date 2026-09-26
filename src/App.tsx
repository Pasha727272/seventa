import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Chrome } from './components/Chrome'
import { GridBg } from './components/GridBg'
import { WalletProvider } from './lib/WalletContext'
import { DistributionsPage } from './pages/DistributionsPage'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { LaunchPage } from './pages/LaunchPage'
import { PulsePage } from './pages/PulsePage'

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <GridBg>
          <Chrome />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pulse" element={<PulsePage />} />
            <Route path="/launch" element={<LaunchPage />} />
            <Route path="/distributions" element={<DistributionsPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GridBg>
      </BrowserRouter>
    </WalletProvider>
  )
}
