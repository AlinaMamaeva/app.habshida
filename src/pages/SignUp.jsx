import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../api/api';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const { data } = await registerUser({
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      localStorage.setItem('token', data.user.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      reset();
      navigate('/');

    } catch (error) {
     
      const serverErrors = error.response?.data?.errors;     //делаем универсальный catch без него вернет SQLite ошибку
      const message = serverErrors?.body?.[0] ||   
      error.response?.data?.error ||
      error.message;

      console.log(message);
      if(!message) return;

      if (message.includes('email')) {
        setError('email', {
          type: 'server',
          message: '*Email already exist',
        });
      }
      if (message.includes('username')) {
        setError('username', {
          type: 'server',
          message: '*Username already exist',
        });
      }
    }
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
