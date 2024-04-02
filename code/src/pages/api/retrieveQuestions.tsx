import { NextApiRequest, NextApiResponse } from 'next';
import { COMMUNICATION_FORM_ID, TYPEFORM_API_URL } from '../../constants/globals';

export default async function retrieveQuestions(req: NextApiRequest, res: NextApiResponse) {
    const { flowName } = req.query; 
    //flowName would be either communication, computer-access, home-access, or smart-phone-access. This is the name of the form that we want to retrieve the questions for. 

    if (flowName === 'communication') {
        try {
            const response = await fetch(`${TYPEFORM_API_URL}/forms/${COMMUNICATION_FORM_ID}`);
            const data = await response.json();
            const { fields, logic } = data; // Extracting fields and logic arrays from data object
            res.status(200).json({ fields, logic }); // Returning only fields and logic arrays
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Invalid flowName' });
    }
}