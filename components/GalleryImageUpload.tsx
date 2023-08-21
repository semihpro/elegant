import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";

export type ImageProps = {
  id: number;
  path: string;
  target: string;
};

const ImageUpload: React.FC<{ image: ImageProps }> = ({ image }) => {
  
  const handleDelete = async (target)=>{
    Swal.fire({
      title: 'Delete Image',
      text: 'Are you sure you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/admin/gallery/${image.id}?target=${image.target}`, {
          method: 'DELETE'
        })
        .then(response => {
          Swal.fire({
            title: 'Deleted',
            text: 'The item has been deleted.',
            icon: 'success'
          });
        })
        .catch(er =>{
          Swal.fire({
            title: 'Error',
            text: 'Operation terminated :' + er.message,
            icon: 'error'
          }).then(()=>{
            location.reload();
          })
        })
        // Simulate delete action
        // Replace this with your actual delete logic
        
      }
    });
  }
  const handleUpload = async (target)=>{
    Swal.fire({
      title: 'Upload Image',
      html: `
        <input type="file" id="imageInput" accept="image/*">
      `,
      showCancelButton: true,
      confirmButtonText: 'Upload',
      preConfirm: () => {
        const imageInput = document.getElementById('imageInput') as HTMLInputElement;;
        const selectedImage = imageInput.files[0];

        if (selectedImage) {
          return selectedImage;
        } else {
          Swal.showValidationMessage('Please select an image to upload.');
          return false;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        if (result.value instanceof File || typeof result.value === 'string') 
        formData.append('image', result.value);
          
          // Simulate API post method
          // Replace this with your actual API endpoint and logic
          fetch(`/api/admin/gallery/${image.id}`, {
            method: 'POST',
            body: formData
          })
          .then(response => {
            
          })
        .then(data => {
          Swal.fire({
            title: 'Uploaded Image',
            text: 'Image uploaded successfully.',
            icon: 'success'
          }).then(()=>location.reload());
        })
        .catch(error => {
          Swal.fire({
            title: 'Upload Failed',
            text: 'There was an error uploading the image.',
            icon: 'error'
          });
        });
      }
    });
  }
  return (
    <div className="card bg-gray text-center">
      <img id={image.target} src={image.path} alt={image.target} />
      <i className="fa fa-pencil color-green mouse-pointer" aria-hidden="true"
        onClick={()=>handleUpload(image.target)}
      ></i>
      <i className="fa fa-trash color-red mouse-pointer" aria-hidden="true"
        onClick={()=>handleDelete(image.target)}
      ></i>
    </div>
  );
};

export default ImageUpload;
