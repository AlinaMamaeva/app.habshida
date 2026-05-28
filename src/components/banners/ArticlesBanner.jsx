import UserInfo from '../../post/UserInfo';

export default function ArticlesBanner({ article }) {
  if (!article) return null;

  return (
    <div className="article-banner">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '800px',
          padding: '50px 0',
          margin: '0 auto',
        }}
      >
        <p className="article-list" style={{ color: 'white' }}>
          {article.title}
        </p>

        <UserInfo user={article.author} />
      </div>
    </div>
  );
}
