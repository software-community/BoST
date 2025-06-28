"use client";
import { FileText } from "lucide-react";

const PdfButton = ({ pdf, pdfIndex }) => {
  const handlePdfClick = async () => {
    console.log('PDF Button clicked!');
    console.log('PDF object:', pdf);
    console.log('PDF URL:', pdf.url);
    console.log('PDF URL type:', typeof pdf.url);
    
    try {
      // Check if it's a base64 string (starts with data: or is pure base64)
      if (pdf.url.startsWith('data:application/pdf;base64,')) {
        console.log('Handling as formatted base64 PDF');
        await handleBase64Pdf(pdf.url);
      } else if (isBase64String(pdf.url)) {
        console.log('Handling as raw base64 data');
        const base64String = `data:application/pdf;base64,${pdf.url}`;
        await handleBase64Pdf(base64String);
      } else {
        console.log('Handling as API endpoint or URL');
        await handleApiEndpoint(pdf.url);
      }
    } catch (error) {
      console.error('Error in handlePdfClick:', error);
      alert(`Error loading PDF: ${error.message}`);
    }
  };

  const isBase64String = (str) => {
    // Check if string looks like base64 data
    if (!str || typeof str !== 'string') return false;
    if (str.length < 100) return false; // Base64 PDFs are typically much longer
    if (str.includes('/api/') || str.includes('http')) return false; // Likely a URL
    
    // More robust base64 detection
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) return false;
    
    // Test if it's valid base64
    try {
      const decoded = atob(str);
      return btoa(decoded) === str;
    } catch (err) {
      return false;
    }
  };

  const handleApiEndpoint = async (url) => {
    try {
      // Extract the id from the URL
      const urlObj = new URL(url, window.location.origin);
      const id = urlObj.searchParams.get('id');
      
      if (!id) {
        throw new Error('No id parameter found in URL');
      }
      
      console.log('Extracted ID:', id);
      
      // Make API call to get binary PDF data
      const apiUrl = `/bost/api/files?id=${id}`;
      console.log('Making API call to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
          // Add any authentication headers here if needed
          // 'Authorization': 'Bearer your-token',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Response content-type:', contentType);

      // Check if response is actually a PDF
      if (!contentType?.includes('application/pdf') && !contentType?.includes('application/octet-stream')) {
        console.warn('Unexpected content type:', contentType);
      }

      // Get the blob data
      const blob = await response.blob();
      console.log('Blob size:', blob.size);
      console.log('Blob type:', blob.type);

      // Validate blob size
      if (blob.size === 0) {
        throw new Error('Received empty PDF file');
      }

      // Create object URL and open
      await openPdfBlob(blob);
      
    } catch (error) {
      console.error('Error fetching PDF from API:', error);
      throw error; // Re-throw to be caught by main handler
    }
  };

  const handleBase64Pdf = async (base64String) => {
    try {
      console.log('Processing base64 PDF, length:', base64String.length);
      
      // Validate base64 string format
      if (!base64String.includes(',')) {
        throw new Error('Invalid base64 format - missing data URL prefix');
      }

      // Extract base64 data
      const base64Data = base64String.split(',')[1];
      if (!base64Data) {
        throw new Error('No base64 data found after comma');
      }

      console.log('Base64 data length:', base64Data.length);

      // Convert base64 to blob more efficiently
      const byteCharacters = atob(base64Data);
      console.log('Decoded byte length:', byteCharacters.length);
      
      if (byteCharacters.length === 0) {
        throw new Error('Decoded PDF data is empty');
      }

      // Create Uint8Array more efficiently for large files
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: 'application/pdf' });
      console.log('Created blob size:', blob.size);

      // Open the PDF
      await openPdfBlob(blob);
      
    } catch (error) {
      console.error('Error processing base64 PDF:', error);
      throw error; // Re-throw to be caught by main handler
    }
  };

  const openPdfBlob = async (blob) => {
    try {
      // Validate blob
      if (!blob || blob.size === 0) {
        throw new Error('Invalid or empty blob');
      }

      // Create object URL
      const blobUrl = URL.createObjectURL(blob);
      console.log('Created blob URL:', blobUrl);

      // Test if the blob URL is accessible by creating a temporary link
      const testLink = document.createElement('a');
      testLink.href = blobUrl;
      
      // Try to open in new window/tab
      const newWindow = window.open(blobUrl, '_blank');
      
      if (!newWindow) {
        // Fallback: force download if popup blocked
        console.log('Popup blocked, trying download fallback');
        testLink.download = pdf.name || `document_${pdfIndex + 1}.pdf`;
        document.body.appendChild(testLink);
        testLink.click();
        document.body.removeChild(testLink);
      }
      
      // Clean up the URL after a longer delay to ensure it loads
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        console.log('Revoked blob URL');
      }, 5000); // Increased timeout
      
    } catch (error) {
      console.error('Error opening PDF blob:', error);
      throw new Error(`Failed to open PDF: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handlePdfClick}
      className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200 min-h-[60px] flex flex-col items-center justify-center text-center"
    >
      <FileText size={16} className="text-blue-600 mb-1 flex-shrink-0" />
      <span className="text-blue-800 font-medium text-xs leading-tight line-clamp-2">
        {pdf.name || `Resource ${pdfIndex + 1}`}
      </span>
    </button>
  );
};

// Container component to wrap multiple PDF buttons in a grid
const PdfButtonGrid = ({ pdfs }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {pdfs.map((pdf, index) => (
        <PdfButton key={index} pdf={pdf} pdfIndex={index} />
      ))}
    </div>
  );
};

// Alternative row layout for fewer PDFs
const PdfButtonRow = ({ pdfs }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {pdfs.map((pdf, index) => (
        <div key={index} className="flex-shrink-0 w-32">
          <PdfButton pdf={pdf} pdfIndex={index} />
        </div>
      ))}
    </div>
  );
};

export default PdfButton;
export { PdfButtonGrid, PdfButtonRow };