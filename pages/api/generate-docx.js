import fs from 'fs';
import { TemplateHandler } from 'easy-template-x';
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing the file:', err);
                return res.status(500).json({ error: 'Error parsing the file' });
            }

            console.log('Fields:', fields);
            console.log('Files:', files);

            try {
                // Access the uploaded template file
                const templateFile = files.template[0];
                if (!templateFile) {
                    return res.status(400).json({ error: 'No template file uploaded' });
                }

                // Read the template file
                const filePath = templateFile.filepath;
                const templateBuffer = fs.readFileSync(filePath);
                console.log('Template file read successfully, size:', templateBuffer.length);

                // Parse the data from fields
                const data = JSON.parse(fields.data[0]);
                console.log('Data being passed to the template:', data); // Log to debug

                const handler = new TemplateHandler();
                
                // Generate document with the provided data
                const doc = await handler.process(templateBuffer, data); // Pass data directly

                if (!doc) {
                    throw new Error('Document generation failed');
                }

                // Set response headers for file download
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                res.setHeader('Content-Disposition', 'attachment; filename=myTemplate-output.docx');
                res.send(doc);
            } catch (error) {
                console.error('Error generating document:', error.message);
                res.status(500).json({ error: 'Error generating document', details: error.message });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
