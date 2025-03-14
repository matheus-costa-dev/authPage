import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify/unstyled";
import ContainerProfile from "../components/ContainerProfile"
import { useNavigate } from "react-router-dom";
import NavClient from "../components/NavClient";

function Profile() {
    const [userDetails, setUserDetails] = useState(false)

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



    return (
        <div className="h-screen flex flex-col justify-center items-center shadow gap-6 bg-cyan-100" >
            <NavClient />

            {userDetails ? (

                <div className="flex flex-col items-center justify-center"> {/* Added centering classes */}


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