import { auth } from '../firebase';
import { toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom';


function NavClientItems() {

    const navigation = [{ name: 'LogOut', href: '/' }];
    const navigate = useNavigate();

    async function onHandleClickLogout() {
        try {
            await auth.signOut();
            navigate('/signin');
        } catch (error) {
            console.log(error);
            toast.error('Não foi possivel fazer o logout');
        }
    }
    return (
        navigation.map((item) =>
            item.name === 'LogOut' ? (
                <button
                    key={item.name} // Added key here
                    className="text-white font-bold p-3 rounded-md text-1xl bg-red-400"
                    onClick={onHandleClickLogout}
                >
                    LogOut
                </button>
            ) : (
                <a
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className="text-sm/6 font-semibold text-gray-900"
                >
                    {item.name}
                </a>
            )
        )
    )
};

export default NavClientItems;