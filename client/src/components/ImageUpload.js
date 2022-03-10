import React from 'react'
import axios from 'axios'



export const ImageUploadField = ({ handleImageUrl, setFormData, value }) => {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', 'du2ggxil')
    const res = await axios.post('https://api.cloudinary.com/v1_1/sei61cloud/video/upload', data)
    handleImageUrl(res.data.url)
  }



  return (
    <>
    {value ?
      <div>
        <video src={value} alt='uploaded' width="350" height="250" controls></video> 
      </div>
      :
      <>
        <label>Upload Your Log</label>
        <br></br>
        <input
          className="input"
          type="file"
          onChange={handleUpload}
        />
      </>
    }
  </>
  )
}