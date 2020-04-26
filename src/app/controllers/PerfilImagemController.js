import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update(req, res){

        //Checa o resultado da validação feito na model
        if (!req.file) {
            return status(400).json({
                error: true,
                code: 129,
                message : "Error: Selecione uma imgem válida JPEG,JPG ou PNG!"
            });
        }

        const dadosImagem = {
            originalName:req.file.originalname,
            fileName: req.file.filename
        }
        
        await User.findOne({_id: req.userId}, '_id fileName').then((user) => {          
            req.dadosImgUser = user.fileName;

        }).catch((err)=> {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Usuário não foi possível executar a usa solicitação!"
            });
        })

        await User.updateOne({_id: req.userId}, dadosImagem, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: "129",
                message: "Erro: Imagem do perfil não editada com sucesso!"
            })
        })
        //Apaga a Imagem antiga do banco de dados
        const imgAntiga = req.file.destination + "/" + req.dadosImgUser;

        fs.access(imgAntiga, (err) => {
            if(!err){
                fs.unlink(imgAntiga, err => {
                    //Msg antiga excluída com sucesso
                });               
            }
        });

        return res.json({
            error: false,
            message: "Imagem do perfil editado com sucesso!"
        });
    }
};

export default new PerfilImagemController();