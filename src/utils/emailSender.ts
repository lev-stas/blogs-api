import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'


dotenv.config()

const gmailAccount = process.env.GMAIL_ACCOUNT
const gmailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailAccount,
        pass: process.env.GMAIL_SECRET
    },
})

export async function sendEmail (recipient: string, subject: string, body: string){
    const info = await gmailTransport.sendMail({
        from: `Stas from IT Incubator <${gmailAccount}>`,
        to: recipient,
        subject: subject,
        html: body
    })
    if(!info.response.includes('OK')){
        console.log('Message has not been sent')
        return null
    }
    return info.messageId
}