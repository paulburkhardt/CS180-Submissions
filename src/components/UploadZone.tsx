import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, FileImage } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface UploadZoneProps {
  onFileUpload: (files: File[]) => void;
  title: string;
  description: string;
  maxFiles?: number;
  uploadedFiles: File[];
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileUpload,
  title,
  description,
  maxFiles = 2,
  uploadedFiles
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
    setDragActive(false);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div
        {...getRootProps()}
        className={`upload-zone rounded-lg p-8 text-center cursor-pointer ${
          isDragActive || dragActive ? 'dragover' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              {isDragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF up to 10MB (max {maxFiles} files)
            </p>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {file.type.includes('gif') ? (
                <FileImage className="h-4 w-4 text-accent" />
              ) : (
                <Image className="h-4 w-4 text-primary" />
              )}
              <span className="truncate">{file.name}</span>
              <span className="text-muted-foreground">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};