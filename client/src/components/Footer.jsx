export default function Footer() {
    const style = {
        // position: 'fixed','
        display:'flex',
        position:'relative',
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        padding: '5% 0',
        bottom: '0',
        width: '100%',
        height: '2.5rem',
        justifyContent:'center'
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
