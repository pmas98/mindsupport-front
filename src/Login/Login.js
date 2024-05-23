import React from "react";
import Navbar from "../components/navbar";

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center lg:w-1/2">
                    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
                        <h1 className="text-5xl font-semibold">Bem-Vindo de Volta!</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Insira seu login</p>
                        <div className="mt-8 ">
                            <div>
                                <label className="text-lg font-medium">Email</label>
                                <input
                                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                    placeholder="Insira seu email"
                                />
                            </div>
                            <div>
                                <label>Senha</label>
                                <input
                                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                    placeholder="Insira sua senha"
                                    type="password"
                                />
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <div>
                                    <input 
                                        type="checkbox"
                                    />
                                    <label className="ml-2 font-medium text-base">Lembrar de mim</label>
                                </div>
                                <button className="font-medium text-base text-red-400">Esqeuci minha senha</button>
                            </div>
                            <div className="mt-8 flex flex-col gap-y-4">
                                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-400 text-white text-lg font-bold">Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full animate-spin"></div>
                    <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
                </div>
            </div>
            <footer className="bg-[#e21b5a] py-8">
                <div className="container mx-auto text-center">
                <p className="font-primaryMedium text-white text-2xl">
                    Todos os direitos reservados
                </p>
                </div>
            </footer>
        </div>
    );
};

export default Login;