<?php
require_once '../../conexao.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM tipo_usuario";
        $sql = $conn->query($sql);
        $dados = $sql->fetchAll(PDO::FETCH_ASSOC);
        $retorno = ['status' => true, 'dados' => $dados];
    break;
}

echo json_encode($retorno);