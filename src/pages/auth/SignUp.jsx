import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    const navigate = useNavigate()


    async function onHandleClickSignIn() {
        if (fname && lname && email && password) {

            try {

                await createUserWithEmailAndPassword(auth, email, password)
                const user = auth.currentUser;
                console.log(user)

                if (user) {
                    await setDoc(doc(db, "users", user.uid), {
                        "firstName": fname,
                        "lastName": lname,
                        "email": email
                    })
                }

                console.log("user registrado")
                toast.success("Usuário registrado com sucesso", {position:"top-center"})
                
                navigate("/signin")

            } catch (error) {
                console.log(error.message)
                toast.error("Email já cadastrado", {position:"top-center"})

            }


        }
    }

    return (
        <div
            className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div
                className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2
                    className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
                >
                    Inscreva-se
                </h2>
            </div>

            <div className="flex flex-col gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <input
                    type="text"
                    autoComplete="name"
                    placeholder="Nome"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => { setFname(e.target.value) }}

                />

                <input
                    type="text"
                    autoComplete="family-name"
                    placeholder="Sobrenome"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => { setLname(e.target.value) }}

                />

                <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => { setEmail(e.target.value) }}

                />

                <input
                    placeholder="Senha"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onHandleClickSignIn}
                >Sign in

                </button>


                <p
                    className="mt-10 text-center text-sm/6 text-gray-500">
                    Já é inscrito?
                    <a
                        className="px-1 font-semibold text-indigo-600 hover:text-indigo-500"
                        onClick={() => { navigate("/signin") }}
                    >
                        faça o login!
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}


export default SignUp;