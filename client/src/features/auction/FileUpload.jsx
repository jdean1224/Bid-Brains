import { useDropzone } from 'react-dropzone';

function FileUpload({ onDrop }) {
  const handleFileDrop = (acceptedFiles) => {
    onDrop(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
      accept: {
        'image/*': ['.jpeg', '.png'],
    },
    multiple: true,
    maxFiles: 6,
  });

  return (
    <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px', marginTop: '20px' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default FileUpload;
