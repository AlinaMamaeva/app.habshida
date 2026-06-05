import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../api/api';

import { useNavigate } from 'react-router-dom';

export default function EditArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getArticle(slug).then((res) => {
      const article = res.data.article;

      reset({
        title: article.title,
        description: article.description,
        body: article.body,
      });
      setTags(article.tagList.filter((tag) => tag != null));
    });
  }, [slug, reset]);

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t != tag));
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await updateArticle(slug, {
        article: {
          title: formData.title,
          description: formData.description,
          body: formData.body,
          tagList: tags,
        },
      });
      // console.log('Updated:', data.article);
      navigate(`/articles/${data.article.slug}`);
    } catch (error) {
      console.log(error);
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

      <div className="tags">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="tags-btn"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} ✕
          </button>
        ))}
      </div>

      <button type="submit" className="auth-btn setting-btn">
        {' '}
        Publish Articles{' '}
      </button>
    </form>
  );
}
