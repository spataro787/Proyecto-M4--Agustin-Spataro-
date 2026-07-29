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
      message: "Método no permitido",
    });

  }


  try {

    const {
      email,
      tasks,
    } = req.body;



    if (!email) {

      return res.status(400).json({
        message: "Email requerido",
      });

    }



    const taskList = tasks
      .map(
        (task: any) =>
          `- ${task.title} (${task.completed ? "Completada" : "Pendiente"})`
      )
      .join("\n");



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

        },


        Body: {

          Text: {

            Data:
              `Hola 👋

Este es tu resumen de tareas:

${taskList}

Saludos.
`,

          },

        },

      },


    };



    await ses.send(
      new SendEmailCommand(params)
    );



    return res.status(200).json({

      message:
        "Correo enviado correctamente",

    });



  } catch (error) {


    console.error(
      "Error AWS SES:",
      error
    );


    return res.status(500).json({

      message:
        "Error enviando correo",

    });


  }

}