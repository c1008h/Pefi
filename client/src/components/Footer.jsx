export default function Footer() {
    const style = {
        position: 'fixed',
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        padding: '5% 0',
        bottom: '0',
        width: '100%',
        height: '2.5rem'
    }
    const footerText = {
        textAlign: 'center',
        color:'white'
    }
    
    return (
        <footer style={style}>
            <p style={footerText}>Copyright © 2023 Chris Hong</p>
        </footer>
    )
}
