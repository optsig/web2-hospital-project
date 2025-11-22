import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import { Link } from 'react-router-dom';

function Navbar() {
    return (

        <div className='flex justify-between align-middle text-lg'>
            
            <div>
                <Link className='p-3 text-blue-600' to={'/'}>
                    <EmergencyOutlinedIcon style={{ fontSize: '50px' }} />
                </Link>
            </div>

            <div className='pt-4 flex gap-3'>
                <Link to={'/about'} className='text-blue-600'>Who We Are</Link>
                <Link to={'/features'}>What We Do</Link>
                <Link to={'/reviews'}>Testimonials</Link>
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