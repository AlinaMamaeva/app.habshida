import { useNavigate } from 'react-router-dom';
import { useForm, Watch } from 'react-hook-form';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    if (formData.password !== formData.repeatPassword) {
      alert('Password do not match');
      return;
    }

    const res = await fetch('https://realworld.habsida.net/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data.errors);
      return;
    }

    localStorage.setItem('token', data.user.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    reset();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form ">
      <h2 className="auth-text">Sign Up</h2>
      {/* USERNAME*/}
      <input
        {...register('username', {
          required: '*Please enter your username',
          minLength: {
            value: 3,
            message: 'Minimum 3 characters',
          },
          maxLength: {
            value: 20,
            message: 'Maximum 20 characters',
          },
        })}
        type="text"
        placeholder="Username"
        className="auth-input"
        autoComplete="username"
      />
      {errors.username && (
        <p className="error-text">{errors.username.message}</p>
      )}
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
            message: '*Minimum 6 characters',
          },
          maxLength: {
            value: 40,
            message: '*Maximum 40 characters',
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
      {/* REPEAT PASSWORD*/}
      <input
        {...register('repeatPassword', {
          required: '*Please repeat your password',
          validate: (value) => value === password || '*Password do not match',
        })}
        type="password"
        placeholder="Repeat Password"
        autoComplete="new-password"
        className="auth-input"
      />
      {errors.repeatPassword && (
        <p className="error-text">{errors.repeatPassword.message}</p>
      )}
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          {...register('terms', {
            required: 'Please confirm that everything is correct',
          })}
          className="checkbox"
        />
        <label className="checkbox-label">
          {' '}
          Yes, I agree to the Terms of Service
        </label>
        {errors.terms && <p className="error-text">{errors.terms.message}</p>}
      </div>

      <button type="submit" className="auth-btn">
        Sign Up
      </button>
    </form>
  );
}
