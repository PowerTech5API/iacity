const { User: UserModel } = require("../models/User");

const nodemailer = require('nodemailer');

// Configurar o transportador de e-mails
// const transporter = nodemailer.createTransport({
//     service: 'smtp.office365.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'fredy.fre@hotmail.com',
//         pass: '@senhaEmail'
//     }
// });

// Criar a mensagem de e-mail
// const email = {
//     from: 'fredy.fre@hotmail.com',
//     to: 'lemuelayres@gmail.com',
//     subject: 'Vamos focar o Lucca no mesão',
//     html: 'Aviso Nesse sábado teremos que anular qualquer magíca não amigável dos jogadores de Zurgo!!',
// };


const userController = {

    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                isSendEmail: true
            }

            // Enviar o e-mail
            // transporter.sendMail(email, function (error, info) {
            //     if (error) {
            //         console.log(error);
            //         return
            //     } else {
            //         console.log('E-mail enviado: ' + info.response);
            //     }
            // });


            const response = await UserModel.create(user)

            res.json({ msg: "Usuário criado com sucesso! Verifique seu e-mail" })
        }
        catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find({}, { password: 0 }); // não exibe a senha

            res.json(users);
        }
        catch (error) {
            console.log(error)
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id // pega id pela que é passado pela rota
            const user = await UserModel.findById(id, { password: 0 }); // não exibe a senha

            // tratando erro para caso não encontre o id
            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            res.json(user);
        }
        catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id)
            // tratando erro para caso não encontre o id

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado" })
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)

            res.status(200).json({ msg: "Usuário deletado com sucesso" })

        }
        catch (error) {
            console.log(error)
        }
    }

}

module.exports = userController;