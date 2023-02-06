import React, { useState } from 'react';

const AugmentWords = () => {
  const [allWordsFile, setAllWordsFile] = useState(null);
  const [existWordBooks, setExistWordBooks] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState(null);

  const handleAllWordsFileChange = (e) => {
    setAllWordsFile(e.target.files[0]);
  };

  const handleExistWordBooksChange = (e) => {
    setExistWordBooks(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('allWordsFile', allWordsFile);
    formData.append('existWordBooks', existWordBooks);
    const response = await fetch('http://localhost:8080/english/wordbook', {
      method: 'POST',
      body: formData
    });
    const blob = await response.blob();
    setDownloadUrl(URL.createObjectURL(blob));
    setDownloadFilename("wordbook.zip");

  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleAllWordsFileChange} />
        <input type="file" onChange={handleExistWordBooksChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        {downloadUrl && <a href={downloadUrl} download={downloadFilename}>Download Link</a>}
      </div>
    </div>
    
  );
};

export default AugmentWords;
