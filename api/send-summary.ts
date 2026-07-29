import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const ses = new SESClient({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },

});



export default async function handler(req: any, res: any) {


  if (req.method !== "POST") {

    return res.status(405).json({
      message: "Método no permitido"
    });

  }



  try {


    console.log({
      region: process.env.AWS_REGION,
      accessKey: process.env.AWS_ACCESS_KEY_ID?.substring(0, 5),
      sender: process.env.AWS_SES_SENDER_EMAIL
    });



    const { email, tasks } = req.body;



    if (!email) {

      return res.status(400).json({
        message: "Email requerido"
      });

    }



    const taskList = tasks
      .map(
        (task: any) =>
          `- ${task.title} (${task.completed ? "Completada" : "Pendiente"})`
      )
      .join("\n");




    const command = new SendEmailCommand({


      Source: process.env.AWS_SES_SENDER_EMAIL,


      Destination: {

        ToAddresses: [
          email
        ]

      },


      Message: {


        Subject: {

          Data: "Resumen de tareas - Gestor Estratégico"

        },


        Body: {


          Text: {

            Data:
              `Hola 👋

Este es tu resumen de tareas:

${taskList}


Saludos.
Gestor Estratégico`

          }


        }


      }


    });




    const response = await ses.send(command);



    console.log("EMAIL ENVIADO:", response.MessageId);



    return res.status(200).json({

      success: true,

      message: "Correo enviado correctamente"

    });



  } catch (error: any) {



    console.error("ERROR AWS SES:", error);



    return res.status(500).json({

      success: false,

      message: error.message

    });


  }


}