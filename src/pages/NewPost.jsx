import { useForm } from 'react-hook-form';

import Tags from '../post/Tags';
import { useState } from 'react';

export default function NewPost({ tags }) {
  const { register, handleSubmit } = useForm();

  const [data, setData] = useState('');

  const onSubmit = (formData) => {
    setData(JSON.stringify(data));
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <input
        {...register('title')}
        placeholder="Title"
        className="auth-input"
      />

      <input
        {...register('description')}
        placeholder="Short description"
        className="auth-input"
      />
      <textarea
        {...register('body')}
        placeholder="Input your text"
        className="auth-input auth-newpost"
      ></textarea>

      <Tags tags={tags} />
      <button type="submit" className="auth-btn setting-btn ">
        {' '}
        Publish Articles{' '}
      </button>
    </form>
  );
}
