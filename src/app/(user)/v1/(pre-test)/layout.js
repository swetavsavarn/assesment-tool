import React from 'react'


import Header from '../elements/Header'
import Footer from '../elements/Footer'

const Layout = ({ children }) => {
    return (
        <div className="bg-primary-300 min-h-screen flex flex-col">
            {/* Header */}
            <Header />
            {children}

            <Footer />
        </div>
    )
}

export default Layout