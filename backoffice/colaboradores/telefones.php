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
echo json_encode($retorno);