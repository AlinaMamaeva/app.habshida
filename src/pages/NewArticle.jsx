import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createArticle } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function NewArticle() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t != tag));
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await createArticle({
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: tags,
      });

      reset();
      navigate(`/articles/${data.article.slug}`);
      console.log(formData);
    } catch (error) {
      console.log(error.response?.data);
    }
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
        <div style={{ width: '80%', display: 'flex', gap: '8px' }}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            className="auth-input
       "
          />
          <button
            type="button"
            onClick={() => {
              const tag = tagInput.trim();
              if (tag && !tags.includes(tag)) {
                setTags([...tags, tag]);
              }
              setTagInput('');
            }}
            className="auth-btn"
            style={{ height: '47px' }}
          >
            {' '}
            Add{' '}
          </button>
        </div>
        <div className="tags" style={{ marginTop: '15px' }}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="tags-btn"
              onClick={() => handleRemoveTag(tag)}
            >
              {' '}
              {tag} ✕{' '}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="auth-btn setting-btn">
        {' '}
        Publish Articles{' '}
      </button>
    </form>
  );
}
