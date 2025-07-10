import React, { useState } from 'react';
import './MyDocuments.css'; // Create this for basic styling

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file || !docType) {
      alert("Please select a file and document type");
      return;
    }

    const newDoc = {
      fileName: file.name,
      documentType: docType,
      fileSize: file.size,
      status: "PENDING",
      uploadedBy: "User",
      remarks: "",
    };

    setDocuments([...documents, newDoc]);

    // Reset form
    setFile(null);
    setDocType('');
    e.target.reset();
  };

  return (
    <div className="my-documents-container">
      <h2>My Documents</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Document Type (e.g., ID Proof, Medical Report)"
          value={docType}
          onChange={e => setDocType(e.target.value)}
          required
        />
        <button type="submit">Upload Document</button>
      </form>

      <div className="documents-list">
        {documents.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.fileName}</td>
                  <td>{doc.documentType}</td>
                  <td>{(doc.fileSize / 1024).toFixed(2)} KB</td>
                  <td>{doc.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
