const Footer = () => {
    const Today = new Date();
    return (
        <footer className="Footer">
            <p>Copyright &copy; {Today.getFullYear()}</p>
        </footer>
    )
 }
 
 export default Footer