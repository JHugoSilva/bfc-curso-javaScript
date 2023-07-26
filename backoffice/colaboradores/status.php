<?php

require_once '../../conexao.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $get = $_GET['id'];
        $dados = explode('/', $get);
        var_dump($dados);
        $sql = "UPDATE usuarios SET status='{$dados[1]}' WHERE id = '{$dados[0]}'";
        $sql = $conn->query($sql);
        $dados = $sql->fetchAll(PDO::FETCH_ASSOC);
        $retorno = ['status' => true, 'dados' => $dados];
    break;
}
echo json_encode($retorno);