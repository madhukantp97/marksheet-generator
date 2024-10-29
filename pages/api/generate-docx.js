// pages/api/generate-docx.js
import fs from 'fs';
import { TemplateHandler } from 'easy-template-x';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Read the template file
            const templateFile = fs.readFileSync('myTemplate.docx');

            // Prepare data
            const data = req.body;

            // Process the template
            const handler = new TemplateHandler();
            const doc = await handler.process(templateFile, data);

            // Set response headers for file download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=myTemplate-output.docx');

            // Send the processed document as a response
            res.send(doc);
        } catch (error) {
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}