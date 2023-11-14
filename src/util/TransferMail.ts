import sgMail from '@sendgrid/mail';
import client from '@sendgrid/client';
import { SENDGRID_API_KEY, SMTP_USER } from '../config';

// Override baseUrl to use TLS 1.2+ test endpoint
client.setApiKey(SENDGRID_API_KEY);
client.setDefaultRequest("baseUrl", "https://tls12.api.sendgrid.com");
sgMail.setClient(client);
// const templateId = SENDGRID_TEMPLATE;
const from = SMTP_USER;

export const transferMail = async (receiver: string, subject: string, templateId: string, dynamicTemplateData: any = null) => {
    try {
        const msg: any = {
            to: receiver,
            from,
            subject,
            templateId,
        };
        if (dynamicTemplateData)
            msg.dynamicTemplateData = dynamicTemplateData;
        const result = await sgMail.send(msg);
        return result;
    } catch (err) {
        console.error("Falid sending email error : ", err.response.body);
        return false;
    }
};