import React from 'react'

function index() {
  const [imgFile, setImgFile] = React.useState(null);


  const handleImgUpload = (e) => {
    setImgFile(e.target.files[0]);
  }
  const submitHandler = () => {

  }

  return (
    <div>
      <form action="/profile" method="post" encType="multipart/form-data">
        <input type="file" name="avatar" onChange={handleImgUpload} />
      </form>

      <button type="submit" onClick={submitHandler}>Upload</button>
    </div>
  )
}

export default index