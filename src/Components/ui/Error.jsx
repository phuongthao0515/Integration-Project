import { Link } from 'react-router-dom';
import errImg from '../../assets/images/404.png';

const Error = ({ err }) => {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="flex gap-20 items-center">
                <div className='flex flex-col gap-8'>
                    <p className="font-bold text-4xl">Something is not right...</p>
                    <p className="text-xl">
                        <span className='font-bold text-red-700 underline'>{err}</span>. If you think this is an error contact support.
                    </p>
                    <Link to={'/login'}>
                        <button className='border border-red-700 text-red-700 text-xl font-semibold rounded-sm py-2 px-6'>Login</button>
                    </Link>
                </div>
                <div>
                    <img src={errImg} alt="Error" />
                </div>
            </div>
        </div>
    );
};

export default Error;
