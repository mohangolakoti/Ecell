import { useRef, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { useFirestore } from '../hooks/useFirestore';
import { useNotifications } from '../contexts/NotificationContext';

export default function BulkEventUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const { addDocument } = useFirestore('events');
  const { showNotification } = useNotifications();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: async (results) => {
        try {
          const [headers, ...rows] = results.data as string[][];
          
          for (const row of rows) {
            if (row.length < headers.length) continue;
            
            const eventData = {
              name: row[headers.indexOf('name')],
              description: row[headers.indexOf('description')],
              eventDate: row[headers.indexOf('eventDate')],
              registrationDeadline: row[headers.indexOf('registrationDeadline')],
              location: row[headers.indexOf('location')],
              department: row[headers.indexOf('department')],
              teamSize: parseInt(row[headers.indexOf('teamSize')]),
              prizeDetails: {
                first: row[headers.indexOf('firstPrize')],
                second: row[headers.indexOf('secondPrize')],
                third: row[headers.indexOf('thirdPrize')],
              },
            };

            await addDocument(eventData);
          }

          showNotification('Events uploaded successfully', 'success');
        } catch (error) {
          setError('Failed to process file. Please check the format.');
          showNotification('Failed to upload events', 'error');
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Bulk Event Upload</h3>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload CSV
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-500">{error}</span>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p>CSV file should include columns:</p>
        <ul className="list-disc list-inside mt-2">
          <li>name</li>
          <li>description</li>
          <li>eventDate</li>
          <li>registrationDeadline</li>
          <li>location</li>
          <li>department</li>
          <li>teamSize</li>
          <li>firstPrize</li>
          <li>secondPrize</li>
          <li>thirdPrize</li>
        </ul>
      </div>
    </div>
  );
}