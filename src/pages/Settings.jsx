import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);

    const token = localStorage.getItem('token');

    const res = await fetch('https://realworld.habsida.net/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          email: formData.email,
          bio: formData.text,
          image: formData.image,
          password: formData.password,
        },
      }),
    });
    const data = await res.json();

    if (data.user) {
      localStorage.setItem('token', data.user.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } else {
      console.log(data.errors);
    }
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
          type="avatar"
          accept="image/*"
          className="auth-input"
          placeholder="Avatar image (URL)"
        />
        {errors.image && <p className="error-text">{errors.image.message}</p>}

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
