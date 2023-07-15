<?php

require_once '../../conexao.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM telefone WHERE usuario_id = '{$_GET['id']}'";
        $sql = $conn->query($sql);
        $dados = $sql->fetchAll(PDO::FETCH_ASSOC);
        $retorno = ['status' => true, 'dados' => $dados];
    break;
    case 'DELETE':
        $sql = "DELETE FROM telefone WHERE id = '{$_GET['id']}'";
        $sql = $conn->query($sql);
        $retorno = ['status' => true, 'dados' => 'DELETE'];
    break;
}
//Aplicação Javascript 2 - Controle de Estoque usando Javascript #P24 - Curso de Javascript - Aula 205 OU 208
echo json_encode($retorno);