import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


// =====================================
// VARIABLES DE ENTORNO
// =====================================

const AWS_REGION = process.env.AWS_REGION?.trim();
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID?.trim();
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY?.trim();
const AWS_SES_SENDER_EMAIL = process.env.AWS_SES_SENDER_EMAIL?.trim();


// =====================================
// VALIDACIÓN DE CONFIGURACIÓN
// =====================================

if (
  !AWS_REGION ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_SES_SENDER_EMAIL
) {
  throw new Error("Faltan variables de entorno de AWS SES");
}


// =====================================
// CLIENTE AWS SES
// =====================================

const ses = new SESClient({

  region: AWS_REGION,

  credentials: {

    accessKeyId: AWS_ACCESS_KEY_ID,

    secretAccessKey: AWS_SECRET_ACCESS_KEY,

  },

});


// =====================================
// HANDLER VERCEL
// =====================================

export default async function handler(
  req: any,
  res: any
) {


  if (req.method !== "POST") {

    return res.status(405).json({

      success: false,

      message: "Método no permitido"

    });

  }



  try {


    // =================================
    // DEBUG SEGURO
    // =================================

    console.log("AWS CHECK", {
      region: AWS_REGION,

      accessKeyStart:
        AWS_ACCESS_KEY_ID?.substring(0, 4),

      accessKeyLength:
        AWS_ACCESS_KEY_ID?.length,

      secretLength:
        AWS_SECRET_ACCESS_KEY?.length,

      sender:
        AWS_SES_SENDER_EMAIL,
    });


    const {
      email,
      tasks = []
    } = req.body;



    if (!email) {

      return res.status(400).json({

        success: false,

        message: "Email requerido"

      });

    }



    const taskList = tasks

      .map(
        (task: any) =>
          `- ${task.title} ${task.completed
            ? "(Completada)"
            : "(Pendiente)"
          }`
      )

      .join("\n");





    const command = new SendEmailCommand({


      Source: AWS_SES_SENDER_EMAIL,


      Destination: {

        ToAddresses: [

          email

        ]

      },



      Message: {


        Subject: {

          Data:
            "Resumen de tareas - Gestor Estratégico"

        },



        Body: {


          Text: {


            Data:

              `Hola 👋

Este es tu resumen de tareas:

${taskList || "No tienes tareas registradas."}


Saludos.

Gestor Estratégico`

          }

        }

      }


    });





    const result = await ses.send(command);



    console.log(
      "EMAIL ENVIADO:",
      result.MessageId
    );



    return res.status(200).json({

      success: true,

      message:
        "Correo enviado correctamente",

      messageId:
        result.MessageId

    });





  } catch (error: any) {


    console.error(
      "ERROR AWS SES:",
      error
    );



    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Error enviando correo"

    });


  }

}