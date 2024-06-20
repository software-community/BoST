import React from 'react';

const TruncateText = ({ text, maxLength, idBlog}) => {
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const truncatedText = text.substring(0, maxLength) + '...';

  return (
    <p >
      Description:
      {truncatedText}
      <a className='text-slate-500' href={`/dashboard/blog/${idBlog}`}>Read More</a>
    </p>
  );
};

export default TruncateText;
