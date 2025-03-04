import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify/unstyled";
import ContainerProfile from "../components/ContainerProfile"
import { useNavigate } from "react-router-dom";

function Profile() {
    const [userDetails, setUserDetails] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData()

    }, [])

    async function fetchUserData() {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {

            console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data())
                toast.success("Usuário logado")

            } else {
                console.log("Usuário não logado")

            }



        })

        return () => unsubscribe()

    }


    async function onHandleClickLogout() {
        try {
            await auth.signOut();
            navigate("/signin")
        } catch (error) {
            console.log(error)
            toast.error("Não foi possivel fazer o logout")
        }
    }



    return (
        <div className="h-screen flex flex-col justify-center items-center shadow gap-6 bg-cyan-100" >

            {userDetails ? (

                <div>


                    <button
                        className="text-white font-bold p-3 rounded-md text-1xl bg-red-400 mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto"
                        onClick={onHandleClickLogout}> LogOut </button>

                    <ContainerProfile
                        title={userDetails.firstName}
                        description={userDetails.lastName}
                        buttonText={userDetails.email}
                        onButtonClick={() => { window.location.href = ` mailto:${userDetails.email}` }}
                    />


                </div>




            ) : (
                <p>Carregando ...</p>
            )
            }

            <ToastContainer />
        </div>

    );
};

export default Profile;