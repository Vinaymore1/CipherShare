// // FileDropzone.tsx
// import { useState } from 'react';
// import { Upload, File, X } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface FileDropzoneProps {
//   onFilesChange: (files: FileList | null) => void;
//   files: FileList | null;
// }

// export function FileDropzone({ onFilesChange, files }: FileDropzoneProps) {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     onFilesChange(e.dataTransfer.files);
//   };

//   const fileList = files ? Array.from(files) : [];

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto">
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={cn(
//           "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
//           isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
//           "hover:border-primary hover:bg-primary/5"
//         )}
//       >
//         <input
//           type="file"
//           id="files"
//           multiple
//           className="hidden"
//           onChange={(e) => onFilesChange(e.target.files)}
//         />
//         <label
//           htmlFor="files"
//           className="flex flex-col items-center gap-4 cursor-pointer"
//         >
//           <Upload className="h-12 w-12 text-muted-foreground lg:h-16 lg:w-16" />
//           <p className="text-base lg:text-lg text-muted-foreground">
//             <span className="font-medium">Click to upload</span> or drag and drop
//           </p>
//           <p className="text-sm lg:text-base text-muted-foreground">
//             Any file type supported
//           </p>
//         </label>
//       </div>

//       {fileList.length > 0 && (
//         <div className="space-y-3 max-w-2xl mx-auto">
//           {fileList.map((file, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-3 p-3 lg:p-4 rounded-md bg-muted/50 hover:bg-muted transition-colors"
//             >
//               <File className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
//               <span className="text-sm lg:text-base flex-1 truncate">{file.name}</span>
//               <button
//                 onClick={() => {
//                   const dt = new DataTransfer();
//                   fileList.forEach((f, i) => {
//                     if (i !== index) dt.items.add(f);
//                   });
//                   onFilesChange(dt.files);
//                 }}
//                 className="text-muted-foreground hover:text-destructive transition-colors"
//               >
//                 <X className="h-5 w-5 lg:h-6 lg:w-6" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFilesChange: (files: FileList | null) => void;
  files: FileList | null;
}

export function FileDropzone({ onFilesChange, files }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesChange(e.dataTransfer.files);
  };

  const fileList = files ? Array.from(files) : [];

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          "hover:border-primary hover:bg-primary/5"
        )}
      >
        <input
          type="file"
          id="files"
          multiple
          className="hidden"
          onChange={(e) => onFilesChange(e.target.files)}
        />
        <label
          htmlFor="files"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Any file type supported
          </p>
        </label>
      </div>

      {fileList.length > 0 && (
        <div className="space-y-2">
          {fileList.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
            >
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm flex-1 truncate">{file.name}</span>
              <button
                onClick={() => {
                  const dt = new DataTransfer();
                  fileList.forEach((f, i) => {
                    if (i !== index) dt.items.add(f);
                  });
                  onFilesChange(dt.files);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}