import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../api/api';
import { useEffect } from 'react';

export default function Settings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const payload = {
        user: {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          image: formData.image,
          //  password: formData.password,
        },
      };
      if (formData.password) {
        payload.user.password = formData.password;
      }
      const { data } = await updateUser(payload);

      // localStorage.setItem('token', data.user.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      reset();
    } catch (error) {
      console.log(error.response?.data?.errors);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image,
      });
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();

    navigate('/');
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form ">
        <h2 className="auth-text"> Your Settings</h2>
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
              message: '*Invalid Email',
            },
          })}
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          className="auth-input"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        {/* TEXT BIO*/}
        <textarea
          {...register('bio')}
          type="text"
          placeholder="Input your bio"
          className="auth-input auth-bio"
        />
        {/* IMAGE*/}
        <input
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/).+/,
              message: '*Enter valid image URL',
            },
          })}
          type="text"
          className="auth-input"
          placeholder="Avatar image (URL)"
          autoComplete="url"
        />
        {errors.image && <p className="error-text">{errors.image.message}</p>}

        {/* PASSWORD*/}
        <input
          {...register('password', {
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

        <button type="submit" className="auth-btn setting-btn">
          Update Settings
        </button>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Or click here to logout
        </button>
      </form>
    </>
  );
}
