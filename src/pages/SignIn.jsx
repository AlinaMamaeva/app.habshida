import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);

    const res = await fetch('https://realworld.habsida.net/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
        },
      }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.user.token);

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } else {
      console.log(data.errors);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form ">
      <h2 className="auth-text">Sign In</h2>
      {/* EMAIL*/}
      <input
        {...register('email', {
          required: '*Please enter your email',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid Email',
          },
        })}
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        className="auth-input"
      />
      {errors.email && <p className="error-text">{errors.email.message}</p>}
      {/* PASSWORD*/}
      <input
        {...register('password', {
          required: '*Please enter your password',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters',
          },
          maxLength: {
            value: 40,
            message: 'Maximum 40 characters',
          },
        })}
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        className="auth-input"
      />
      {errors.password && (
        <p className="error-text">{errors.password.message}</p>
      )}
      <button type="submit" className="auth-btn">
        Sign in
      </button>
    </form>
  );
}
