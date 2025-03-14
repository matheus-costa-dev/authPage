import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import Nav  from '../../components/Nav.jsx'


function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();


    async function onHandleClickSignIn() {
        if (email && password) {

            try {

                await signInWithEmailAndPassword(auth, email, password)
                console.log("Usuário logado")
                toast.success("Usuário logado com sucesso", { position: "top-center" })

                navigate("/main")

            } catch (error) {
                console.log(error)
                toast.error("Usuário não encontrado", { position: "top-center" })

            }

            return setAlert(false)

        }



        return setAlert(true)
    }

    return (

        <div
            className=" flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Nav />


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
                    Login
                </h2>
            </div>

            <div
                className="flex flex-col gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
            >

                {alert && (



                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline"> Preencha os campos</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg
                                className="fill-current h-6 w-6 text-red-500"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                onClick={() => { setAlert(false) }}
                            ><title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                        </span>
                    </div>
                )

                }

                <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => { setEmail(e.target.value) }}

                />

                <div className="flex flex-col gap-2">
                    <input
                        placeholder="Senha"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <a href="#" className="text-right font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>

                <div>
                    <button
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onHandleClickSignIn}
                    >Sign in

                    </button>
                </div>

                <p
                    className="mt-10 text-center text-sm/6 text-gray-500">
                    Não é inscrito?
                    <a
                        onClick={() => { navigate("/signup") }}
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Se inscreva já!
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}


export default SignIn;