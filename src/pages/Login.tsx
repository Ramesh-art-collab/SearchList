import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';


interface LoginProps {
    email: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState<LoginProps>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(({...form, [name]: value }));
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError(null);
        // Add your login logic here

        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }
        else {
            console.log('Logging in with', form);
            // Navigate to home page after successful login
            navigate('/home');
            // Dispatch login action to Redux store
            dispatch(login(form.email));
            // Reset form
            setForm({ email: '', password: '' });
        }
    };

    return (

        <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <p className="text-medium text-gray-500 text-center mt-2">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                         outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                         outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg
                       hover:bg-indigo-700 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;