    import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
    import '../styles/Navbar.css'
    import { Link } from 'react-router-dom';

    function Navbar({onHideSidebar}) {
        return (
            <div className='flex justify-between align-middle'>
                <button className='p-3' onClick={onHideSidebar}>
                    <EmergencyOutlinedIcon style={{ fontSize: '50px' }} />
                </button>
                <div className='pt-4'>
                    <Link className='p-3' to="/login">
                        Login
                    </Link>

                    <Link className='p-3' to="/register">
                        Get Started
                    </Link>
                </div>
            </div>
        )
    }

    export default Navbar