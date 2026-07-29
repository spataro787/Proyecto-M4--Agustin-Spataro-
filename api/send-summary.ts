import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Método no permitido",
    });
  }


  try {

    const { email, tasks } = req.body;


    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email requerido",
      });
    }


    const taskList = Array.isArray(tasks) && tasks.length > 0
      ? tasks
        .map(
          (task: any) =>
            `- ${task.title} (${task.completed ? "Completada" : "Pendiente"})`
        )
        .join("\n")
      : "No hay tareas registradas";


    const params = {

      Source: process.env.AWS_SES_SENDER_EMAIL,

      Destination: {
        ToAddresses: [
          email
        ],
      },

      Message: {

        Subject: {
          Data: "Resumen de tareas",
          Charset: "UTF-8",
        },

        Body: {

          Text: {
            Data:
              `Hola 👋

Este es tu resumen de tareas:

${taskList}

Saludos.
`,
            Charset: "UTF-8",
          },

        },

      },

    };


    await ses.send(
      new SendEmailCommand(params)
    );


    console.log("Correo enviado a:", email);


    return res.status(200).json({

      success: true,

      message:
        "Resumen enviado correctamente",

    });


  } catch (error: any) {


    console.error(
      "ERROR AWS SES:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Error enviando resumen",

      error:
        error.message,

    });

  }

}