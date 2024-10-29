// pages/generate.js
import { useState } from 'react';

export default function GeneratePage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDocument = async () => {
        setIsGenerating(true);
        const response = await fetch('/api/generate-docx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                details: [
                    { student: 'Alon Bar',  fathername:'john wick',   mothername:'alexa wick',  class:'1st',  dob:'01/01/2021', rollno:'754',attendance:'100',english: '25' , hindi: '46', maths: '12', gk:'48',drawing:'75'},
                    { student: 'Alon Bar2', fathername:'john wick2',  mothername:'alexa wick2', class:'2nd',  dob:'01/01/2046', rollno:'455',attendance:'101',english: '95' , hindi: '42', maths: '18', gk:'38',drawing:'73'},
                    { student: 'Alon Bar3', fathername:'john wick3',  mothername:'alexa wick3', class:'3rd',  dob:'01/01/2024', rollno:'145',attendance:'102',english: '85' , hindi: '41', maths: '78', gk:'28',drawing:'87'},
                    { student: 'Alon Bar4', fathername:'john wick4',  mothername:'alexa wick4', class:'4th',  dob:'01/01/2064', rollno:'445',attendance:'103',english: '78' , hindi: '35', maths: '87', gk:'88',drawing:'92'},
                    { student: 'Alon Bar5', fathername:'john wick5',  mothername:'alexa wick5', class:'5th',  dob:'01/01/2078', rollno:'225',attendance:'104',english: '67' , hindi: '38', maths: '75', gk:'68',drawing:'88'},
                    { student: 'Alon Bar6', fathername:'john wick6',  mothername:'alexa wick6', class:'6th',  dob:'01/01/2087', rollno:'243',attendance:'105',english: '75' , hindi: '39', maths: '64', gk:'58',drawing:'74'},
                    { student: 'Alon Bar7', fathername:'john wick7',  mothername:'alexa wick7', class:'7th',  dob:'01/01/2048', rollno:'278',attendance:'106',english: '70' , hindi: '46', maths: '68', gk:'78',drawing:'84'},
                    { student: 'Alon Bar8', fathername:'john wick8',  mothername:'alexa wick8', class:'8th',  dob:'01/01/2075', rollno:'267',attendance:'107',english: '54' , hindi: '86', maths: '98', gk:'35',drawing:'54'},
                    { student: 'Alon Bar9', fathername:'john wick9',  mothername:'alexa wick9', class:'9th',  dob:'01/01/2071', rollno:'289',attendance:'108',english: '45' , hindi: '75', maths: '73', gk:'76',drawing:'37'},
                    { student: 'Alon Bar10',fathername:'john wick10', mothername:'alexa wick10',class:'10th',dob:'01/01/2034', rollno:'287',attendance:'109',english: '34' , hindi: '49', maths: '74', gk:'60',drawing:'54'},
                ]
            }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'myTemplate-output.docx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Failed to generate document');
        }
        setIsGenerating(false);
    };

    return (
        <div>
            <h1>Generate Document</h1>
            <button onClick={generateDocument} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate DOCX'}
            </button>
        </div>
    );
}