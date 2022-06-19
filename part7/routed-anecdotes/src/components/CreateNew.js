import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/index';

export const CreateNew = (props) => {
  const [content, resetContent] = useField('content');
  const [author, resetAuthor] = useField('author');
  const [info, resetInfo] = useField('info');

  const navigate = useNavigate();

  const reset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={reset}>
        <div>
          content
          <input { ...content } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url for more info
          <input { ...info } />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  );

};
