import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (

        <div className='flex justify-between align-middle text-lg'>
            
            <div>
                <button className='p-3 text-blue-600 '>
                    <EmergencyOutlinedIcon style={{ fontSize: '50px' }} />
                </button>
            </div>

            <div className='pt-4 flex gap-3'>
                <a href='#' className='text-blue-600 '>Who We Are</a>
                <a href='#'>What We Do</a>
                <a href='#'>Contact Us</a>
            </div>

            <div className='pt-4'>
                <Link className='p-3' to="/login">
                    Login
                </Link>

                <Link className='border-white bg-blue-600 rounded-lg me-4 p-2 border-2 text-white' to="/register">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Navbar