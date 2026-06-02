import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../api/api';
import Tags from '../post/Tags';
import { useNavigate } from 'react-router-dom';

export default function EditArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

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
    });
  }, [slug, reset]);

  const onSubmit = async (formData) => {
    try {
      const { data } = await updateArticle(slug, {
        article: {
          title: formData.title,
          description: formData.description,
          body: formData.body,
        },
      });
      console.log('Updated:', data.article);
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
