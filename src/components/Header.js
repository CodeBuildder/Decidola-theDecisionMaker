import React from 'react'

const Header = (props) => (
    <div className="header">
    <h1 className="headerTitle" >{props.title}</h1>
    {props.subtitle && <h2 className="headerSubtitle">{props.subtitle}</h2>}
    </div>
)  


Header.defaultProps = {
title: 'Decidola'
}

export default Header