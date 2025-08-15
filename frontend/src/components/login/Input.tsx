import { SignupProps } from "../../interface";

export const Input = (props: SignupProps) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.name}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          name={props.id}
          type={props.type}
          autoComplete={props.autoComplete}
          required
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition ease-out delay-100 duration-300 focus:outline-none hover:ring-2 hover:ring-inset hover:ring-indigo-500"
        />
      </div>
    </div>
  );
};

// import { useState } from "react";
// import { Input } from "./Input"; // Путь к твоему компоненту
//
// export const Signup = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     };
//
//     const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault(); // Предотвращаем перезагрузку страницы
//         console.log("Form submitted with:", email, password);
//         // Логика для отправки данных на сервер
//     };
//
//     return (
//         <form onSubmit={handleSubmit}> {/* Оборачиваем форму в тег <form> */}
//             <Input
//                 name="Email"
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//             />
//
//             <Input
//                 name="Password"
//                 id="password"
//                 type="password"
//                 autoComplete="new-password"
//             />
//
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };