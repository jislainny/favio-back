import express from 'express';
import {
    buscarTodosUsuarios,
    criarUsuario,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
} from './UsuarioController';

const router = express.Router();

router.get('/usuarios', buscarTodosUsuarios);
router.post('/usuarios', criarUsuario);
router.get('/usuarios/:id', buscarUsuarioPorId);
router.put('/usuarios/:id', atualizarUsuario);
router.delete('/usuarios/:id', deletarUsuario);

export default router;