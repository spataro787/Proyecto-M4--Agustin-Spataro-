export default function handler(req: any, res: any) {
  res.status(200).json({ status: 'ok', message: 'AWS SES Summary API Placeholder' });
}

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_REGION);
console.log(process.env.AWS_SES_SENDER_EMAIL);