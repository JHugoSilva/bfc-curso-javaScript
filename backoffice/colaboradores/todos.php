<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
require_once '../../conexao.php';
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM usuarios";
        if (!empty($_GET['id'])){
           $sql .= " WHERE id ='{$_GET['id']}'";
        }
        $sql = $conn->query($sql);
        $dados = $sql->fetchAll(PDO::FETCH_ASSOC);
        $retorno = ['status' => true, 'dados' => $dados];
    break;
    case 'POST':
        $post = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO usuarios(nome, tipo, status, foto) VALUES(:nome, :tipo, :status, :foto)";
        $sql = $conn->prepare($sql);
        $sql->bindValue(':nome', $post->nome);
        $sql->bindValue(':tipo', $post->tipo);
        $sql->bindValue(':status', $post->status);
        
        define('UPLOAD_DIR', 'uploads/');
        $img = $post->f_foto;
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.png';
        $success = file_put_contents($file, $data);
        $sql->bindValue(':foto', $file);
        $data1[] = $file;

        if ($sql->execute()) {
            $idUser = $conn->lastInsertId();
            foreach ($post->numTelefone as $fone) {
                $sql = "INSERT INTO telefone(usuario_id, ddd, numero)VALUES(:usuario_id, :ddd, :numero)";
                $sql = $conn->prepare($sql);
                $sql->bindValue(':usuario_id', $idUser);
                $sql->bindValue(':ddd', '852');
                $sql->bindValue(':numero', $fone);
                $sql->execute();
            }
        }
        $retorno = ['status' => true, 'dados' => 'ok'];
    break;
}

echo json_encode($retorno);