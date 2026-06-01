import { useForm } from 'react-hook-form';

import Tags from '../post/Tags';

export default function NewArticle() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <input
        {...register('title', {
          required: '*Title is required',
        })}
        placeholder="Title"
        className="auth-input"
      />
      {errors.title && <p className="error-text">{errors.title.message}</p>}

      <input
        {...register('description', {
          required: '*Description is required',
        })}
        placeholder="Short description"
        className="auth-input"
      />
      {errors.description && (
        <p className="error-text">{errors.description.message}</p>
      )}
      <textarea
        {...register('body', {
          required: '*Text is required',
        })}
        placeholder="Input your text"
        className="auth-input auth-newpost"
      ></textarea>
      {errors.body && <p className="error-text">{errors.body.message}</p>}

      <div className="auth-tags">
        <Tags limit={5} />
      </div>

      <button type="submit" className="auth-btn setting-btn">
        {' '}
        Publish Articles{' '}
      </button>
    </form>
  );
}
